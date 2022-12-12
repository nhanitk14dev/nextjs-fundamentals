import type { ReactElement } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import NavBar from '../nav/NavBar'

const DefaultLayout = (page: ReactElement) => {
  return (
    <div className="default-container">
      <Header />
      <NavBar />
      <main className="main">{page}</main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
