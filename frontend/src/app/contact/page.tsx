import styles from '../page.module.css';

export default function Contact() {
  return (
    <div className={styles.hackerBg}>
      {/* <h1 className={styles.hackerTitle}>Contact <span className={styles.neon}>ComponentLab</span></h1> */}
      <p className={styles.hackerSubtitle}>
        
      </p>

      <form className={styles.contactForm} style={{
        background: 'rgba(0, 0, 0, 0.4)',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 0 30px rgba(0,255,0,0.25)',
        maxWidth: '600px',
        margin: '3rem auto',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="name" className={styles.formLabel}>🧑 Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.formInput}
            placeholder="Neo"
            required
            style={{
              padding: '10px',
              borderRadius: '6px',
              background: '#111',
              color: '#0f0',
              border: '1px solid #0f0'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email" className={styles.formLabel}>📩 Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.formInput}
            placeholder="neo@matrix.dev"
            required
            style={{
              padding: '10px',
              borderRadius: '6px',
              background: '#111',
              color: '#0f0',
              border: '1px solid #0f0'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="message" className={styles.formLabel}>💬 Your Message</label>
          <textarea
            id="message"
            name="message"
            className={styles.formTextArea}
            placeholder="Drop your thoughts..."
            required
            rows={4}
            style={{
              padding: '10px',
              borderRadius: '6px',
              background: '#111',
              color: '#0f0',
              border: '1px solid #0f0',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          style={{
            background: '#00ff00',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            padding: '12px',
            cursor: 'pointer',
            boxShadow: '0 0 15px #0f0',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          🚀 Send Message
        </button>
      </form>
    </div>
  );
}
