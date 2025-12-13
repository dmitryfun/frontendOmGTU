import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/explorer', label: 'Коллекция' },
  { to: '/planner', label: 'Планер' },
]

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>brew</div>
        <div>
          <p className={styles.logoTitle}>Coffee Atlas</p>
          <p className={styles.logoSubtitle}>аромат, баланс, зерно</p>
        </div>
      </div>

      <nav className={styles.nav}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
