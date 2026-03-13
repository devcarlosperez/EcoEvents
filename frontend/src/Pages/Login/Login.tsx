import { useContext, useState } from "react"
import { Input } from '../../Components/Input/input'
import { Submit } from '../../Components/Submit/submit'
import { Title } from '../../Components/Title/title'
import { AuthContext } from '../../Components/Context/AuthContext'
import style from './Login.module.scss'
import loginImg from '../../assets/Img/login-Img.png'
import Logo from '../../assets/Img/Logo.svg'
import { Link, useNavigate } from "react-router-dom"
import { login } from '../../Services/UserService'

export function Login() {
    // State to show authentication error messages to the user
    const [error, setError] = useState<string | null>(null)

    // Set from auth context to store logged-in user info globally
    const { setUserData } = useContext(AuthContext)

    // Navigation helper for redirecting after successful login
    const navigate = useNavigate()

    async function postLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // Save input values
        const form = e.currentTarget
        const userName = (form.elements.namedItem("username") as HTMLInputElement).value
        const passWord = (form.elements.namedItem("password") as HTMLInputElement).value

        try {
            const data = await login(userName, passWord)
            setUserData(data)
            setError(null)
            navigate('/about')
        } catch (error) {
            console.error('Error login in: ', error);
            setError('Something went wrong - try again')
        }
    }

    return (
        <>
            {/* Page layout container */}
            <div className={style.page}>


                {/* Left side: login form */}
                <div className={style.formContainer}>
                    {/* App logo */}
                    <div className={style.containerLogo}>
                        <img className={style.logosvg} src={Logo} alt="EcoEvents logo" />
                    </div>

                    <Title text="Log in" />

                    <form className={style.contactForm} onSubmit={postLogin}>
                        <Input type="email" name="username" autoComplete="email" label="Email" placeholder="Email" />
                        <Input type="password" name="password" autoComplete="current-password" label="Password" />
                        <Submit className={style.button} value="Login" />

                        {/* Link to signup for users without an account */}
                        <h3 className={style.h3}>Create an account</h3>
                        <Link to="/signup">
                            <button type="button" className={style.button}>Signup</button>
                        </Link>
                    </form>

                    {error && <b className={style.error}>{error}</b>}
                </div>

                <div className={style.rightSide}>
                    <img src={loginImg} alt="Login illustration" />
                </div>

            </div>
        </>
    )
}
