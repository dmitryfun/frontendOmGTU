import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const highlights = [
  {
    title: 'Живое меню из API',
    description: 'Используем открытое coffee API, чтобы карточки напитков всегда были актуальны.',
  },
  {
    title: 'Мультимодульные стили',
    description: 'Каждая страница получает свой модуль стилей, чтобы дизайн был чистым и управляемым.',
  },
  {
    title: 'Готово к мобайлу',
    description: 'Перестраиваем сетки, увеличиваем кликабельные зоны и сохраняем акценты на небольших экранах.',
  },
]

const rituals = [
  {
    title: 'Утренний старт',
    note: 'Легкое тело и медовый aftertaste для плавного пробуждения.',
    tags: ['200 мл воды', '16 г зерна', 'время 5 мин'],
  },
  {
    title: 'Дневной фокус',
    note: 'Больше сладости и плотности, чтобы помочь сосредоточиться.',
    tags: ['230 мл воды', '18 г зерна', 'время 6 мин'],
  },
  {
    title: 'Вечерний чилл',
    note: 'Без резкой кислотности, мягкий аромат и низкий кофеин.',
    tags: ['180 мл воды', '14 г зерна', 'время 4 мин'],
  },
]

function Home() {
  return (
    <div className={styles.screen}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Coffee Atlas · лабораторная 6</p>
          <h1 className={styles.title}>Соберите свой кофейный маршрут</h1>
          <p className={styles.subtitle}>
            Три страницы, живое API и адаптивный дизайн. Исследуйте горячие напитки, а затем соберите личный
            план заваривания.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/explorer">
              Открыть коллекцию
            </Link>
            <Link className={styles.secondary} to="/planner">
              Перейти к плану
            </Link>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>25+</span>
              <span className={styles.metricLabel}>напитков в каталоге</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>3</span>
              <span className={styles.metricLabel}>адаптивные страницы</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>100%</span>
              <span className={styles.metricLabel}>React + CSS Modules</span>
            </div>
          </div>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.badge}>Вкус — баланс — текстура</div>
          <p className={styles.heroLabel}>Слои вкуса</p>
          <div className={styles.flavorBar}>
            <span>цитрус</span>
            <span>карамель</span>
            <span>орех</span>
            <span>шоколад</span>
          </div>
          <p className={styles.heroNote}>
            Каждая страница приложения строится из независимых компонентов с собственными модулями стилей, поэтому
            на десктопе, планшете и телефоне сохраняются одинаковые акценты.
          </p>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.heroStat}>API</p>
              <p className={styles.heroStatLabel}>локальный /api/coffee.json</p>
            </div>
            <div>
              <p className={styles.heroStat}>Маршруты</p>
              <p className={styles.heroStatLabel}>дом · офис · вечер</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.highlights}>
        {highlights.map((item) => (
          <article key={item.title} className={styles.highlightCard}>
            <p className={styles.highlightTitle}>{item.title}</p>
            <p className={styles.highlightDesc}>{item.description}</p>
          </article>
        ))}
      </section>

      <section className={styles.rituals}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>План в три шага</p>
            <h2 className={styles.sectionTitle}>Выберите настроение дня</h2>
            <p className={styles.sectionDesc}>
              Короткие сценарии, чтобы быстро собрать личный сет: время, объем воды и вес зерна уже подобраны.
            </p>
          </div>
          <Link to="/planner" className={styles.secondary}>
            Настроить под себя
          </Link>
        </div>

        <div className={styles.ritualGrid}>
          {rituals.map((ritual) => (
            <div key={ritual.title} className={styles.ritualCard}>
              <div className={styles.ritualHead}>
                <span className={styles.pill}>режим</span>
                <p className={styles.ritualTitle}>{ritual.title}</p>
              </div>
              <p className={styles.ritualNote}>{ritual.note}</p>
              <div className={styles.tagRow}>
                {ritual.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
