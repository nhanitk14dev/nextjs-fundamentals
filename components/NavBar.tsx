import styles from './header/Header.module.scss'
import Link from './Link'
import useUser from '../libs/use-user'
import { useRouter } from 'next/router'
import axios from 'axios'

const NavBar = () => {

  const { user, mutateUser } = useUser() // check user is authenticated
  const router = useRouter()

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <ul className={styles.navMenu}>
          <li>
            <Link href="/" activeClassName="active">
              <a className={styles.navLink}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/users" as="/users" activeClassName="active">
              <a className={styles.navLink}>Users List</a>
            </Link>
          </li>

          {user?.isLoggedIn && (
            <>
              <li>
                <Link href="/profile" activeClassName="active">
                  <a className={styles.navLink}>Profile</a>
                </Link>
              </li>
              <li>
              <a className={styles.navLink} onClick={async () => {
                  mutateUser(await axios.post('/api/logout'), false);
                  router.push('/login')
                }}>
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;