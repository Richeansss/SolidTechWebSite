import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import Cookies from 'js-cookie'

interface IHeaderProps {
  isAuth: boolean
  userRole: string
}

const Header: FC<IHeaderProps> = (props) => {
  const navigate = useNavigate()
  const { isAuth, userRole } = props

  const handleNavClick = (path: string) => {
    navigate(path)
  }

  const handleLogOut = () => {
    Cookies.remove('jwt')
    window.location.reload()
  }

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <img
          src='logo.png'
          alt='logo'
          className={styles.header__nav__logo}
          onClick={() => handleNavClick('/')}
        />
        <ul className={styles.header__nav__list}>
          <li className={styles.header__nav__list__item}>
            <NavLink to='/table-page' className={styles.header__nav__list__item__link}>
              Архив
            </NavLink>
          </li>
          {userRole !== 'USER' && (
              <li className={styles.header__nav__list__item}>
                <img
                    src="/Map.svg"
                    alt="Локация"
                    style={{ width: '16px', height: '16px', marginRight: '8px', verticalAlign: 'middle' }}
                />
                <span className={styles.locationText}>Томск</span>
              </li>
          )}
          {isAuth && (
              <li className={styles.header__nav__list__item} onClick={handleLogOut}>
                Выйти
              </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export {Header}
