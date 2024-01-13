import styles from './page.module.css'
import WeatherSearch from './weather/WeatherSearch'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <WeatherSearch  />
      </div>
    </main>
  )
}
