import '../styles/globals.css'
import commonStyles from '../styles/Common.module.css'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import NavBar from '../components/nav/NavBar'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Header />
      <NavBar />
      <main className={commonStyles.main}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
