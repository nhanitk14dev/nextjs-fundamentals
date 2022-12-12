import type { ReactElement } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import NavBar from '../nav/NavBar'
import styles from './Layout.module.scss'

const AuthLayout = (page: ReactElement) => {
  return (
    <div className="auth-container">
      <Header />
      <NavBar />
      <main className={styles.authContainer}>{page}</main>
      <Footer />
    </div>
  )
}

export default AuthLayout
