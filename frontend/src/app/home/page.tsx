import styles from '../page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.hackerBg}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          ComponentLab — <span className={styles.neon}>Unleash Developer Mode</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Craft. Customize. Copy. A hacker-themed playground for React components.
        </p>
        <div className={styles.heroCtas}>
          <Link href="/dashboard" className={styles.ctaButtonPrimary}>Generate Components</Link>
          <Link href="/about" className={styles.ctaButtonSecondary}>Explore Library</Link>
          <Link href="/signup" className={styles.ctaButtonSecondary}>Get Started</Link>
        </div>
      </section>

      {/* What is ComponentLab? */}
      <section className={styles.introSection}>
        <h2 className={styles.sectionHeading}>What is ComponentLab?</h2>
        <p className={styles.sectionBody}>
          ComponentLab is your hacker-mode toolkit for building, previewing, and exporting React components with instant JSX/TSX + CSS code. Whether you're prototyping or pushing to production, we've got your component needs covered.
        </p>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionHeading}>Features Designed for Speed and Style</h2>
        <ul className={styles.featuresList}>
          <li>⚡ Real-time component preview</li>
          <li>🧩 Copy JSX / TSX / CSS instantly</li>
          <li>📦 Download as ZIP</li>
          <li>🎨 Dark-mode UI with hacker aesthetic</li>
          <li>💾 Auto-save and restore</li>
        </ul>
      </section>

      {/* Why Choose Us? */}
      <section className={styles.valueSection}>
        <h2 className={styles.sectionHeading}>Why Developers Love ComponentLab</h2>
        <p className={styles.sectionBody}>
          Built for speed. Designed for devs. Inspired by terminals. Whether you're a frontend ninja or backend wizard dabbling in UI, ComponentLab feels like home.
        </p>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionHeading}>Built by developers, for developers</h2>
        <div className={styles.testimonialsList}>
          <blockquote>“Finally, a playground that doesn’t feel like kindergarten.”</blockquote>
          <blockquote>“ComponentLab gives me dev dopamine.”</blockquote>
          <blockquote>“Minimal, dark, powerful — love it!”</blockquote>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className={styles.finalCtaSection}>
        <h2 className={styles.sectionHeading}>Start Hacking UI Today</h2>
        <div className={styles.heroCtas}>
          <Link href="/dashboard" className={styles.ctaButtonPrimary}>Generate a Component</Link>
          <Link href="/login" className={styles.ctaButtonSecondary}>Login to ComponentLab</Link>
          <Link href="/dashboard" className={styles.ctaButtonSecondary}>Continue as Guest</Link>
        </div>
      </section>
    </div>
  );
}
