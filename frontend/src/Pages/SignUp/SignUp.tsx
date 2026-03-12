import { useState } from "react"
import { Input } from '../../Components/Input/input'
import { Submit } from '../../Components/Submit/submit'
import style from './SignUp.module.scss'
import Sign from '../../assets/Img/SignUp.png'
import Logo from '../../assets/Img/Logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../Services/UserService'

export function SignUp() {
    // State to store error messages if signup fails
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    // Function called when the signup form is submitted
    async function postSignUp(e: React.FormEvent<HTMLFormElement>) {
        // Prevent page reload on form submit
        e.preventDefault()

        // Get form element
        const form = e.currentTarget

        // Extract input values from the form fields
        const name = (form.elements.namedItem("name") as HTMLInputElement).value
        const surName = (form.elements.namedItem("surname") as HTMLInputElement).value
        const email = (form.elements.namedItem("email") as HTMLInputElement).value
        const password = (form.elements.namedItem("password") as HTMLInputElement).value

        try {
            await createUser({
                name: name,
                surname: surName,
                email: email,
                password: password
            })
            setError(null)
            navigate('/login')
        } catch (error) {
            console.error(error);
            setError('Something went wrong - try again')
        }
    }

    return (
        <>
            <div className={style.page}>

                {/* Signup form container */}
                <div className={style.formContainer}>

                    {/* Logo section */}
                    <div className={style.containerLogo}>
                        <img className={style.logosvg} src={Logo} alt="Logo" />
                    </div>

                    <h1>Create an account</h1>

                    {/* Signup form */}
                    <form className={style.contactForm} onSubmit={postSignUp}>

                        {/* Input fields */}
                        <Input type="text" name="name" autoComplete="name" label="Name" required />
                        <Input type="text" name="surname" autoComplete="surname" label="Surname" required />
                        <Input type="email" name="email" autoComplete="email" label="Email" required />
                        <Input type="password" name="password" autoComplete="current-password" label="Password" required />

                        {/* Submit button */}
                        <Submit className={style.button} value="Sign up" />
                        <h3 className={style.h3}>Already have an account?</h3>
                        <Link to="/login">
                            <button type="button" className={style.button}>Login</button>
                        </Link>
                    </form>

                    {/* Display error message if signup fails */}
                    {error && <b className={style.error}>{error}</b>}
                </div>

                {/* Right side image */}
                <div className={style.rightSide}>
                    <img src={Sign} alt="Signup illustration" />
                </div>
            </div>
        </>
    )
}