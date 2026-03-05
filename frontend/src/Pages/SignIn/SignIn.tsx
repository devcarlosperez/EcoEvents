import { useContext, useState } from "react"
import { Input } from '../../Components/Input/input'
import { Submit } from '../../Components/Submit/submit'
import { AuthContext } from '../../Components/Context/AuthContext'
import { Title } from '../../Components/Title/title'
import style from './SignIn.module.scss'

export function Signin() {
    const [error, setError] = useState<string | null>(null)
    const { userData, setUserData } = useContext(AuthContext)

    function postLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        //Gem input values
        const form = e.currentTarget
        const Name = (form.Name as HTMLInputElement).value
        const SurName = (form.SurName as HTMLInputElement).value
        const Email = (form.Email as HTMLInputElement).value
        const PassWord = (form.password as HTMLInputElement).value
        //Opret body (URLSearchParamms)
        const body = new URLSearchParams()

        //Append input values til body
        body.append('name', Name)
        body.append('surname', SurName)
        body.append('email', Email)
        body.append('password', PassWord)

        const url = 'http://localhost:3000/login'

        //POST body to backend server and handles response (success/error)
        fetch(url, { method: 'POST', body: body })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data)
                setError('')
            })
            .catch((error) => {
                console.error('Error signin in: ', error);
                setError('something went wrong- try again')

            })

    }

    console.log('UserData: ', userData);

    return (
        <>
            <Title text={'Create an account'} />

            <div className={style.formContainer}>
                <form className={style.contactForm} onSubmit={(e) => postLogin(e)}>
                    <div className={style.contactContainer}>
                        <Input type="text" name="name" autoComplete="name" label="Name"></Input>
                        <Input type="text" name="surname" autoComplete="surname" label="SurName"></Input>
                    </div>
                    <Input type="email" name="email" autoComplete="email" label="Email"></Input>
                    <Input type="password" name="password" autoComplete="current-password" label="Password"></Input>
                    <Submit className={style.button} value="Sign in"></Submit>
                </form>
                {error && <b className={style.error}>{error}</b>}
            </div>
        </>
    )
}