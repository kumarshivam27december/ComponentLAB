import styles from '../page.module.css';

export default function About() {
  return (
    <div className={styles.hackerBg}>
      {/* Low-opacity background image */}
      {/* <img
        src="/d9ca3467-1d54-4949-85e6-37a3f3f72623.png"
        alt="Code Flow"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.05,
        }}
      /> */}

      {/* Content Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '4rem auto',
          padding: '2.5rem',
          borderRadius: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          boxShadow: '0 0 30px rgba(0, 255, 0, 0.3)',
          border: '1px solid #0f0',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            color: '#0f0',
            textAlign: 'center',
            textShadow: '0 0 10px #0f0',
            marginBottom: '2rem',
          }}
        >
          About <span className={styles.neon}>ComponentLab</span>
        </h1>

        <p className={styles.hackerSubtitle}>
          ⚙️ <strong>ComponentLab</strong> is your hacker-themed lab for rapid React prototyping, powered by AI.<br />
          Create, edit, and experiment with UI components in real time.
        </p>

        <p className={styles.hackerSubtitle}>
          👨‍💻 Whether you're a beginner or an experienced developer, ComponentLab gives you a powerful yet simple interface to visualize and test your UI instantly.
        </p>

        <p className={styles.hackerSubtitle}>
          🔧 With real-time previews, live coding, and an AI-powered generator, you can build complex UIs faster — no setup or configs needed.
        </p>

        <div style={{ margin: '2rem 0' }}>
          <p className={styles.hackerSubtitle} style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
            🚀 Key Features:
          </p>
          <ul style={{ listStyleType: 'none', paddingLeft: 0, lineHeight: '1.8' }}>
            <li>✅ Instant component creation with live previews</li>
            <li>🎨 Customizable CSS & JS for each component</li>
            <li>📦 Export as ZIP or copy code in one click</li>
            <li>🔗 Share components or push to production</li>
            <li>🧠 AI-suggested optimizations & fixes</li>
            <li>🧪 Built for fast, collaborative prototyping</li>
          </ul>
        </div>

        <p className={styles.hackerSubtitle}>
          🔥 Whether building a single button or an entire UI system, ComponentLab helps you move fast and build beautiful.
        </p>

        <p className={styles.hackerSubtitle}>
          👥 Join the devs redefining UI creation. Hack, test, and deploy — the smart way.
        </p>
      </div>
    </div>
  );
}
