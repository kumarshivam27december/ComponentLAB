"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import JSZip from "jszip";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

type ChatTurn = { role: string; content: string };

export default function PlaygroundPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [chat, setChat] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [css, setCss] = useState("");
  const [tab, setTab] = useState<"code"|"css">("code");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    axios.get(`/api/sessions/${sessionId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setChat(res.data.chat || []);
        setCode(res.data.code || "");
        setCss(res.data.css || "");
      })
      .catch(() => setError("Failed to load session"));
  }, [router, sessionId]);

  // Helper to extract JSX from code string
  function extractJSX(code: string) {
    // Try to find the return ( ... ) block
    const match = code.match(/return\s*\((([\s\S]*?))\);/);
    if (match && match[1]) {
      return match[1];
    }
    // fallback: if not found, return the whole code
    return code;
  }

  useEffect(() => {
    // Update iframe preview
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        const jsx = extractJSX(code);
        doc.open();
        doc.write(`<!DOCTYPE html><html><head><style>${css}</style></head><body>${jsx}</body></html>`);
        doc.close();
      }
    }
  }, [code, css]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    const newChat = [...chat, { role: "user", content: input }];
    setChat(newChat);
    setInput("");
    try {
      const res = await axios.post("/api/ai/generate", {
        prompt: input,
        code,
        css
      }, { headers: { Authorization: `Bearer ${token}` } });
      setChat([...newChat, { role: "ai", content: "Component updated." }]);
      setCode(res.data.code);
      setCss(res.data.css);
      // Auto-save session
      await axios.put(`/api/sessions/${sessionId}`, {
        chat: [...newChat, { role: "ai", content: "Component updated." }],
        code: res.data.code,
        css: res.data.css,
        uiState: {}
      }, { headers: { Authorization: `Bearer ${token}` } });
    } catch {
      setError("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (tab === "code") navigator.clipboard.writeText(code);
    else navigator.clipboard.writeText(css);
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    zip.file("Component.tsx", code);
    zip.file("styles.css", css);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "component.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)" }}>
      {/* Chat panel */}
      <div style={{
        width: 340,
        borderRight: "2px solid #39ff14",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        background: "rgba(15,32,39,0.98)",
        boxShadow: "2px 0 24px #39ff1433",
        minHeight: "100vh"
      }}>
        <h3 style={{ color: "#39ff14", fontFamily: 'Share Tech Mono, monospace', fontSize: 24, marginBottom: 18, textShadow: '0 0 10px #39ff14' }}>Chat</h3>
        <div style={{ flex: 1, overflowY: "auto", marginBottom: 12, background: "rgba(0,255,0,0.03)", borderRadius: 8, padding: 8 }}>
          {chat.map((turn, i) => (
            <div key={i} style={{ marginBottom: 10, color: turn.role === "user" ? "#00ffea" : "#39ff14", fontFamily: 'Share Tech Mono, monospace', fontSize: 15 }}>
              <b>{turn.role === "user" ? "You" : "AI"}:</b> {turn.role === "ai" && (turn.content === "Component updated." || turn.content.trim().startsWith("import ")) ? "Component updated." : turn.content}
            </div>
          ))}
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={3}
          style={{ width: "100%", marginBottom: 10, borderRadius: 6, border: "1.5px solid #39ff14", background: "#181818", color: "#39ff14", fontFamily: 'Share Tech Mono, monospace', padding: 10, fontSize: 15, resize: 'vertical' }}
          placeholder="Describe your component..."
        />
        <button onClick={handleSend} disabled={loading} style={{ width: "100%", background: "#39ff14", color: "#181818", fontWeight: 'bold', border: 'none', borderRadius: 6, padding: '12px', cursor: 'pointer', boxShadow: '0 0 10px #39ff14', fontFamily: 'Share Tech Mono, monospace', fontSize: 16, marginBottom: 6, transition: 'all 0.2s' }}>Send</button>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </div>
      {/* Main preview and code */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 32, gap: 24 }}>
        <div style={{ flex: 1, borderRadius: 12, border: "2px solid #39ff14", background: "#181818", marginBottom: 18, boxShadow: '0 0 24px #39ff1433', overflow: 'hidden' }}>
          <iframe ref={iframeRef} title="preview" style={{ width: "100%", height: "100%", border: "none", background: "white", borderRadius: 12 }} sandbox="allow-scripts allow-same-origin" />
        </div>
        <div style={{ display: "flex", alignItems: "center", borderRadius: 8, border: "1.5px solid #00ffea", background: "#0f2027", padding: '10px 18px', marginBottom: 10, gap: 12, boxShadow: '0 0 12px #00ffea33' }}>
          <button onClick={() => setTab("code")} style={{ background: tab === "code" ? "#39ff14" : "transparent", color: tab === "code" ? "#181818" : "#00ffea", border: 'none', borderRadius: 6, padding: '8px 18px', fontFamily: 'Share Tech Mono, monospace', fontWeight: 'bold', fontSize: 15, cursor: 'pointer', boxShadow: tab === "code" ? '0 0 10px #39ff14' : 'none', transition: 'all 0.2s' }}>JSX/TSX</button>
          <button onClick={() => setTab("css")} style={{ background: tab === "css" ? "#39ff14" : "transparent", color: tab === "css" ? "#181818" : "#00ffea", border: 'none', borderRadius: 6, padding: '8px 18px', fontFamily: 'Share Tech Mono, monospace', fontWeight: 'bold', fontSize: 15, cursor: 'pointer', boxShadow: tab === "css" ? '0 0 10px #39ff14' : 'none', transition: 'all 0.2s' }}>CSS</button>
          <button onClick={handleCopy} style={{ marginLeft: 16, background: '#00ffea', color: '#181818', border: 'none', borderRadius: 6, padding: '8px 18px', fontFamily: 'Share Tech Mono, monospace', fontWeight: 'bold', fontSize: 15, cursor: 'pointer', boxShadow: '0 0 10px #00ffea', transition: 'all 0.2s' }}>Copy</button>
          <button onClick={handleDownload} style={{ marginLeft: 8, background: '#39ff14', color: '#181818', border: 'none', borderRadius: 6, padding: '8px 18px', fontFamily: 'Share Tech Mono, monospace', fontWeight: 'bold', fontSize: 15, cursor: 'pointer', boxShadow: '0 0 10px #39ff14', transition: 'all 0.2s' }}>Download ZIP</button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: 18, borderRadius: 8, background: "#fff", border: "1.5px solid #00ffea", boxShadow: '0 0 12px #00ffea33' }}>
          {tab === "code" ? (
            <SyntaxHighlighter language="tsx" style={materialLight} wrapLongLines customStyle={{ background: '#fff', color: '#222', fontSize: 15, borderRadius: 8 }}>
              {code}
            </SyntaxHighlighter>
          ) : (
            <SyntaxHighlighter language="css" style={materialLight} wrapLongLines customStyle={{ background: '#fff', color: '#222', fontSize: 15, borderRadius: 8 }}>
              {css}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </div>
  );
}