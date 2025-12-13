import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Explorer from './pages/Explorer'
import Home from './pages/Home'
import Planner from './pages/Planner'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.appShell}>
      <Header />
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/planner" element={<Planner />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
