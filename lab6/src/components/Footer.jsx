import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.title}>Small batch digital coffee lab</p>
        <p className={styles.caption}>React, Vite, и открытое API для практики.</p>
      </div>
      <div className={styles.meta}>
        <span className={styles.pill}>API: локальный /api/coffee.json</span>
        <span className={styles.pill}>Сделано для ЛР6</span>
      </div>
    </footer>
  )
}

export default Footer
