import { useContext, useState } from "react"
import { Input } from '../../Components/Input/input'
import { Submit } from '../../Components/Submit/submit'
import { AuthContext } from '../../Components/Context/AuthContext'
import { Title } from '../../Components/Title/title'
import style from './Login.module.scss'
import login from '../../assets/Img/login-Img.png'
import Logo from '../../assets/Img/Logo.svg'
import type {LoginData} from '../../Types/Auth'


export function Login() {
    const [error, setError] = useState<string | null>(null)
    const { userData, setUserData } = useContext(AuthContext)


 

    function postLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        //Gem input values
        const form = e.currentTarget
        const userName = (form.username as HTMLInputElement).value
        const passWord = (form.password as HTMLInputElement).value

        const LoginData: LoginData = {
        email: userName,      // email i typen matcher dit username felt
        password: passWord
    };
   
        //Opret body (URLSearchParamms)
        const body = new URLSearchParams()

        //Append input values til body
        body.append('username', LoginData.email);
        body.append('password', LoginData.email)

        const url = 'http://localhost:3000/login'

        //POST body to backend server and handles response (success/error)
        fetch(url, { method: 'POST', body: body })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data)
                setError('')
            })
            .catch((error) => {
                console.error('Error loggin in: ', error);
                setError('something went wrong- try again')

            })

    }

    console.log('UserData: ', userData);
    return (
        <>
        <img src={Logo} alt="" />           
               <Title text={'Log in'} />
            <div className={style.page}>
               
            
                <div className={style.formContainer}>

                    <form className={style.contactForm} onSubmit={postLogin}>
                        <Input type="text" name="username" autoComplete="username" label="Username" />
                        <Input type="password" name="password" autoComplete="current-password" label="Password" />
                        <Submit className={style.button} value="Login" />
                        <Title text={'Create an account'} />
                        <Submit className={style.button} value="Signup" />
                    </form>

                    {error && <b className={style.error}>{error}</b>}
                </div>


                <div className={style.rightSide}>
                    <img src={login} alt="" />
                </div>
            </div>
        </>
    )
}
