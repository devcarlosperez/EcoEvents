import { useContext, useState } from "react"
import { Input } from '../../Components/Input/input'
import {Submit} from '../../Components/Submit/submit'
import { AuthContext } from '../../Components/Context/AuthContext'
import {Title} from '../../Components/Title/title'
import style from'./Login.module.scss'

export function Login() {
    const [error, setError] = useState<string | null>(null)
    const { userData, setUserData } = useContext(AuthContext)

    function postLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        //Gem input values
        const form = e.currentTarget
        const email = (form.email as HTMLInputElement).value
        const passWord = (form.password as HTMLInputElement).value
        //Opret body (URLSearchParamms)
        const body = new URLSearchParams()

        //Append input values til body
        body.append('email', email)
        body.append('password', passWord)

        const url = 'http://localhost:3000/login'

        //POST body to backend server and handles response (success/error)
        fetch(url, { method: 'POST', body: body })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data)
                setError('')
            })
            .catch((error) => {
                console.error('Error login in: ', error);
                setError('something went wrong- try again')

            })

    }

    console.log('UserData: ', userData);

    return (
        <>
          <Title  text={'Login'} /> 

            <div className={style.formContainer}>
                <form className={style.contactForm} onSubmit={(e) => postLogin(e)}>
                    <Input type="text" name="email" autoComplete="email" label="Email"></Input>
                    <Input type="password" name="password" autoComplete="current-password" label="Password"></Input>
                    <Submit className={style.button} value="Login"></Submit>
                </form>
                {error && <b className={style.error}>{error}</b>}
            </div>
        </>
    )
}