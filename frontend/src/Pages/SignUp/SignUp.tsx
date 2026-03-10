import { useContext, useState } from "react"
import { Input } from '../../Components/Input/input'
import { Submit } from '../../Components/Submit/submit'
import { AuthContext } from '../../Components/Context/AuthContext'
import style from './SignUp.module.scss'
import Sign from '../../assets/Img/SignUp.png'
import Logo from '../../assets/Img/Logo.svg'

export function SignUp() {
    const [error, setError] = useState<string | null>(null)
    const { userData, setUserData } = useContext(AuthContext)

    function postSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        //Gem input values
        const form = e.currentTarget
        const name = (form.Name as HTMLInputElement).value
        const surName = (form.SurName as HTMLInputElement).value
        const email = (form.email as HTMLInputElement).value
        const password = (form.password as HTMLInputElement).value
        //Opret body (URLSearchParamms)
        const body = new URLSearchParams()

        //Append input values til body
        body.append('name', name)
        body.append('surname', surName)
        body.append('email', email)
        body.append('password', password)

        const url = 'http://localhost:3000/login'

        //POST body to backend server and handles response (success/error)
        fetch(url, { method: 'POST', body: body })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data)
                setError('null')
            })
            .catch((error) => {
                console.error(error);
                setError('something went wrong- try again')
            })

    }
    console.log('UserData: ', userData);

    return (
        <>
            <div className={style.page}>

                <div className={style.formContainer}>
                    <div className={style.containerLogo}>
                        <img className={style.logosvg} src={Logo} alt="" />
                    </div>
                  <h1>Create an account</h1>

                    <form className={style.contactForm} onSubmit={(postSignUp)}>
                        <Input type="text" name="name" autoComplete="name" label="Name"></Input>
                        <Input type="text" name="surname" autoComplete="surname" label="SurName"></Input>
                        <Input type="email" name="email" autoComplete="email" label="Email"></Input>
                        <Input type="password" name="password" autoComplete="current-password" label="Password"></Input>
                        <Submit className={style.button} value="Sign up"></Submit>
                    </form>
                    {error && <b className={style.error}>{error}</b>}
                </div>

                <div className={style.rightSide}>
                    <img src={Sign} alt="" />
                </div>
            </div>
        </>
    )
}