import styles from "../Css/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        Contact: <a href="mailto:LearnReflectsession@gmail.com" style={{ color: '#ccc' }}>LearnReflectsession@gmail.com</a>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <a href="/privacy" style={{ color: '#aaa', textDecoration: 'underline' }}>Privacy Policy</a>
      </div>
    </footer>
  );
}
