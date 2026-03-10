import style from './input.module.scss'

interface inputProps {
  label: string
  type: string
  name: string
  value?: string
  autoComplete: string
}

export function Input({ label, type, name, autoComplete }: inputProps) {
  return (
    <label className={style.inputStyle}>
      {label}
      <input 
        type={type} 
        name={name} 
        autoComplete={autoComplete}
        placeholder={name}
      />
    </label>
  )
}