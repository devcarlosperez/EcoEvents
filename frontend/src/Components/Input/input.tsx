import style from './input.module.scss'

// TypeScript interface that defines the props the Input component accepts
interface inputProps {
  label: string
  type: string
  name: string
  value?: string
  autoComplete: string
}

// Reusable Input component
// It receives props and renders a labeled input field
export function Input({ label, type, name, autoComplete }: inputProps) {
  return (
    // Wrapper label that contains both the label text and the input field
    <label className={style.inputStyle}>
      
      {/* Display the label text */}
      {label}

      {/* Input field with dynamic attributes from props */}
      <input 
        type={type} 
        name={name} 
        autoComplete={autoComplete}
        placeholder={name} // Uses the input name as placeholder text
      />
    </label>
  )
}