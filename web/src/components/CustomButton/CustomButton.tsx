import { CSSProperties, FC } from 'react'
import styles from './CustomButton.module.css'

interface ICustomButtonProps {
  children: string
  disabled?: boolean
  style?: CSSProperties
  onClick?: () => void
  className?: string
}

const CustomButton: FC<ICustomButtonProps> = (props) => {
  const { children, disabled = false, style = {}, onClick } = props

  return (
    <button className={styles.button} style={style} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export { CustomButton }
