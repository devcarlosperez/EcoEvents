import React, { useContext, useState } from "react"
import { Input } from '../../Components/Input/input'
import { Submit } from '../../Components/Submit/submit'
import { AuthContext } from '../../Components/Context/AuthContext'
import style from './Login.module.scss'
import loginImg from '../../assets/Img/login-Img.png'
import Logo from '../../assets/Img/Logo.svg'
import { Link, useNavigate } from "react-router-dom"
import { login } from '../../Services/UserService'

export function Login() {
    const [error, setError] = useState<string | null>(null)
    const { setUserData } = useContext(AuthContext)
    const navigate = useNavigate()

    async function postLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        //Gem input values
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
            <div className={style.page}>


                <div className={style.formContainer}>
                    <div className={style.containerLogo}>
                        <img className={style.logosvg} src={Logo} alt="" />
                    </div>
                    <h1>Log in</h1>

                    <form className={style.contactForm} onSubmit={postLogin}>
                        <Input type="email" name="username" autoComplete="email" label="Email" placeholder="Email" />
                        <Input type="password" name="password" autoComplete="current-password" label="Password" />
                        <Submit className={style.button} value="Login" />
                        <h3 className={style.h3}>Create an account</h3>
                        <Link to="/signup">
                            <button type="button" className={style.button}>Signup</button>
                        </Link>
                    </form>

                    {error && <b className={style.error}>{error}</b>}
                </div>

                <div className={style.rightSide}>
                    <img src={loginImg} alt="" />
                </div>

            </div>
        </>
    )
}
