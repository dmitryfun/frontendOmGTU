import { useEffect, useMemo, useState } from 'react'
import styles from './Explorer.module.css'

const API_URL = '/api/coffee.json'
const filters = [
  { id: 'all', label: 'все' },
  { id: 'milk', label: 'молочные' },
  { id: 'chocolate', label: 'с шоколадом' },
  { id: 'espresso', label: 'эспрессо база' },
]

function Explorer() {
  const [drinks, setDrinks] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [focus, setFocus] = useState('all')

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        setStatus('loading')
        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error('Не удалось получить данные')
        }
        const data = await response.json()
        setDrinks(data)
        setStatus('ready')
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'Ошибка загрузки данных')
        setStatus('error')
      }
    }

    load()
    return () => controller.abort()
  }, [])

  const filteredDrinks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return drinks.filter((drink) => {
      const matchesQuery =
        drink.title.toLowerCase().includes(normalizedQuery) ||
        drink.description?.toLowerCase().includes(normalizedQuery)

      const ingredients = (drink.ingredients || []).map((i) => i.toLowerCase())
      const matchesFilter =
        focus === 'all' ||
        (focus === 'milk' && ingredients.some((i) => i.includes('milk'))) ||
        (focus === 'chocolate' && ingredients.some((i) => i.includes('chocolate'))) ||
        (focus === 'espresso' && ingredients.some((i) => i.includes('espresso')))

      return matchesQuery && matchesFilter
    })
  }, [drinks, focus, query])

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>API коллекция</p>
          <h1 className={styles.title}>Горячие напитки из локального API</h1>
          <p className={styles.desc}>
            Данные подтягиваются через fetch-запрос к локальному JSON. Фильтруйте ингредиенты и ищите по названию,
            чтобы собрать свою дегустацию.
          </p>
          <div className={styles.statusRow}>
            <span className={styles.pill}>Источник: {API_URL}</span>
            <span className={styles.pill}>Найдено: {filteredDrinks.length}</span>
          </div>
        </div>
      </header>

      <div className={styles.controls}>
        <label className={styles.field}>
          <span>Поиск по названию</span>
          <input
            type="search"
            placeholder="например, mocha"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className={styles.filterRow}>
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.filterButton} ${focus === item.id ? styles.filterActive : ''}`}
              onClick={() => setFocus(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {status === 'loading' && <p className={styles.muted}>Загружаем напитки...</p>}
      {status === 'error' && <p className={styles.error}>⚠️ {error}</p>}

      <div className={styles.grid}>
        {filteredDrinks.map((drink) => (
          <article key={drink.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div>
                <p className={styles.cardTitle}>{drink.title}</p>
                <p className={styles.cardSubtitle}>#{drink.id}</p>
              </div>
              {drink.image && <img src={drink.image} alt={drink.title} className={styles.thumb} loading="lazy" />}
            </div>

            <p className={styles.cardDesc}>
              {drink.description ||
                'Описание не предоставлено в API. Этот напиток готовят из свежесмолотых зерен и горячей воды.'}
            </p>

            <div className={styles.ingredients}>
              {(drink.ingredients || []).map((ingredient) => (
                <span key={ingredient} className={styles.chip}>
                  {ingredient}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Explorer
