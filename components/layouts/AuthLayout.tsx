import type { ReactElement } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import styles from './Layout.module.scss'

const AuthLayout = (page: ReactElement) => {
  return (
    <div className="auth-container">
      <Header />
      <main className={styles.authContainer}>{page}</main>
      <Footer />
    </div>
  )
}

export default AuthLayout
