import { FC, useEffect, useState } from 'react'
import { useCreateAuthTokenMutation } from '../../store/api/authApi'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.css'
import { CustomButton, Loader } from '../../components'
import { setCredentials } from '../../store/slice/authSlice';
import { useDispatch } from 'react-redux';
import Eye from "../../components/Icons/Eye";
import EyeOff from "../../components/Icons/EyeOff";

const initialState = {
  username: '',
  password: '',
}

const LoginPage: FC = () => {
  const [state, setState] = useState(initialState)
  const navigate = useNavigate()
  const [authError, setAuthError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [isRussianPassword, setIsRussianPassword] = useState(false);


  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const [login, { error, data, isLoading }] = useCreateAuthTokenMutation()

  const handleInputChange = (value: string, field: string) => {
    if (field === 'password') {
      setIsRussianPassword(/[а-яА-ЯёЁ]/.test(value));
    }
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleButtonClick = async () => {
    setAuthError(null);
    try {
      const result = await login(state).unwrap();
      const jwt = result.data.jwt;
      console.log('JWT:', jwt);

      // ⬇️ Обновляем Redux
      dispatch(setCredentials({ jwt }));
      // ⬇️ Перенаправляем на главную
      navigate('/create');
    } catch (err: any) {
      console.error('Ошибка при логине:', err);

      if (err?.status === 'FETCH_ERROR') {
        setAuthError('Нет соединения с сервером. Проверьте подключение.');
      } else if (err?.data?.result?.message) {
        setAuthError(err.data.result.message);
      } else {
        setAuthError('Произошла ошибка. Попробуйте позже.');
      }
    }
  };

  // Обработчик нажатия клавиши
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick()
    }
  }

  useEffect(() => {
    if (error) {
      // Если ошибка есть, проверяем её и выводим сообщение
      console.error('Error:', error);  // Лог ошибки
      // @ts-ignore
      if ('data' in error && error.data?.result?.message) {
        // @ts-ignore
        setAuthError(error.data.result.message); // Сохраняем сообщение об ошибке
      }
    }

    if (data) {
      console.log('Data received:', data);  // Лог полученных данных
      if (data.data && data.data.jwt) {
        console.log('JWT received:', data.data.jwt);  // Лог JWT токена
        navigate('/create');  // Перенаправление
      }
    }
  }, [error, data, navigate]);



  if (isLoading) {
    return (
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <Loader />
          </div>
        </div>
    )
  }

  return (
      <div className={styles.wrapper}>
        <h1>Авторизация</h1>
        <div className={styles.form}>
          <div className={styles.form__header}>
            <label htmlFor='username_login' className={styles.form__label}>
              <span className={styles.form__span}>Имя пользователя</span>
              <input
                  id='username_login'
                  type='text'
                  className={styles.form__input}
                  value={state.username}
                  onChange={(event) => handleInputChange(event?.target.value, 'username')}
              />
            </label>
            <label htmlFor='password_login' className={styles.form__label}>
              <span className={styles.form__span}>Пароль</span>
              <div className={styles.passwordInputWrapper}>
                <input
                    id='password_login'
                    type={showPassword ? 'text' : 'password'}
                    className={styles.form__input}
                    value={state.password}
                    onChange={(event) => handleInputChange(event?.target.value, 'password')}
                    onKeyDown={handleKeyDown}
                />
                <button
                    type="button"
                    className={styles.togglePasswordButton}
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {isRussianPassword && (
                  <p className={styles.warning}>⚠️ В поле русские символы</p>
              )}
            </label>
          </div>
          {authError && <p className={styles.warning}>{authError}</p>}

          <CustomButton
              className={styles.loginButton}
              style={{ width: '300px' }}
              disabled={state.username === '' || state.password === ''}
              onClick={handleButtonClick}
          >
            Войти
          </CustomButton>
        </div>
      </div>
  )
}

export {LoginPage}