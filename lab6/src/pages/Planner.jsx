import { useMemo, useState } from 'react'
import styles from './Planner.module.css'

const presets = [
  { id: 'home', name: 'Домашний фильтр', water: 220, ratio: 15, grind: 'Средний', vibe: 'для спокойного утра' },
  { id: 'office', name: 'Офисный драйв', water: 240, ratio: 14, grind: 'Средне-мелкий', vibe: 'чтобы не потерять фокус' },
  { id: 'evening', name: 'Поздний вечер', water: 180, ratio: 16, grind: 'Крупнее', vibe: 'мягко и без перегруза' },
]

const steps = [
  { title: 'Прогрейте фильтр', duration: '0:30', detail: 'Промойте фильтр горячей водой и прогрейте сервинг.' },
  { title: 'Влейте 1/3 воды', duration: '0:45', detail: 'Сделайте предсмачивание по спирали, чтобы кофе равномерно намок.' },
  { title: 'Долейте до объема', duration: '2:00', detail: 'Лейте плавно, удерживая уровень воды в воронке.' },
  { title: 'Перемешайте и дайте настояться', duration: '0:30', detail: 'Снимите корку, дождитесь, пока поток остановится.' },
]

const extras = [
  { id: 'bloom', label: 'Дольше предсмачивание', tip: '+10 c к аромату' },
  { id: 'ice', label: 'Ледяной куб', tip: 'охлаждает сладость' },
  { id: 'double', label: 'Двойная доза', tip: 'плотнее и насыщеннее' },
]

function Planner() {
  const [preset, setPreset] = useState(presets[0])
  const [water, setWater] = useState(preset.water)
  const [ratio, setRatio] = useState(preset.ratio)
  const [selectedExtras, setSelectedExtras] = useState(new Set())

  const grams = useMemo(() => Math.round((water / ratio) * 10) / 10, [water, ratio])

  const toggleExtra = (id) => {
    setSelectedExtras((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const applyPreset = (item) => {
    setPreset(item)
    setWater(item.water)
    setRatio(item.ratio)
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Планер</p>
          <h1 className={styles.title}>Соберите заваривание под настроение</h1>
          <p className={styles.subtitle}>
            Выберите пресет, подстройте воду и соотношение, а дальше следуйте короткому чек-листу. Страница остается
            локальной, поэтому можно пробовать без страха.
          </p>
        </div>
        <div className={styles.readout}>
          <p className={styles.readoutLabel}>Итог</p>
          <p className={styles.readoutValue}>{grams} г кофе</p>
          <p className={styles.readoutHint}>
            {preset.name} · {water} мл воды · 1:{ratio}
          </p>
        </div>
      </header>

      <section className={styles.presetGrid}>
        {presets.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.presetCard} ${preset.id === item.id ? styles.presetActive : ''}`}
            onClick={() => applyPreset(item)}
          >
            <div className={styles.presetTop}>
              <p className={styles.presetName}>{item.name}</p>
              <span className={styles.pill}>{item.vibe}</span>
            </div>
            <p className={styles.presetStats}>
              Вода {item.water} мл · Соотношение 1:{item.ratio} · Помол {item.grind}
            </p>
          </button>
        ))}
      </section>

      <section className={styles.controls}>
        <div className={styles.controlCard}>
          <div className={styles.controlHead}>
            <p className={styles.controlTitle}>Объем воды</p>
            <span className={styles.controlValue}>{water} мл</span>
          </div>
          <input
            type="range"
            min="160"
            max="280"
            step="5"
            value={water}
            onChange={(event) => setWater(Number(event.target.value))}
          />
        </div>
        <div className={styles.controlCard}>
          <div className={styles.controlHead}>
            <p className={styles.controlTitle}>Соотношение воды к кофе</p>
            <span className={styles.controlValue}>1:{ratio}</span>
          </div>
          <input
            type="range"
            min="12"
            max="18"
            step="1"
            value={ratio}
            onChange={(event) => setRatio(Number(event.target.value))}
          />
        </div>
      </section>

      <section className={styles.extraSection}>
        <p className={styles.extraTitle}>Добавьте детали</p>
        <div className={styles.extras}>
          {extras.map((item) => (
            <label key={item.id} className={styles.extraCard}>
              <input
                type="checkbox"
                checked={selectedExtras.has(item.id)}
                onChange={() => toggleExtra(item.id)}
              />
              <div>
                <p className={styles.extraLabel}>{item.label}</p>
                <p className={styles.extraTip}>{item.tip}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.steps}>
        <p className={styles.extraTitle}>Шаги заваривания</p>
        <div className={styles.stepGrid}>
          {steps.map((step) => (
            <div key={step.title} className={styles.stepCard}>
              <div className={styles.stepHead}>
                <p className={styles.stepTitle}>{step.title}</p>
                <span className={styles.pill}>{step.duration}</span>
              </div>
              <p className={styles.stepDetail}>{step.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Planner
