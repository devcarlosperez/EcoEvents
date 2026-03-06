import style from './Title.module.scss'

interface TitleProps {
  text: string
}

export function Title({ text }: TitleProps) {
  return <h3 className={style.titleStyle}>{text}</h3>
}