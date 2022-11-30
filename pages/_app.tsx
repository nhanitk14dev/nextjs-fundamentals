import '../styles/globals.css'
import '../styles/common.css'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import NavBar from '../components/nav/NavBar'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Header />
      <NavBar />
      <main className="main">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
