import { useContext, useState } from "react"
import { Input } from '../../Components/Input/input'
import { Submit } from '../../Components/Submit/submit'
import { AuthContext } from '../../Components/Context/AuthContext'
import style from './SignUp.module.scss'
import Sign from '../../assets/Img/SignUp.png'
import Logo from '../../assets/Img/Logo.svg'

export function SignUp() {
    // State to store error messages if signup fails
    const [error, setError] = useState<string | null>(null)

    // Get userData and setUserData from AuthContext to manage global user state
    const { userData, setUserData } = useContext(AuthContext)

    // Function called when the signup form is submitted
    function postSignUp(e: React.FormEvent<HTMLFormElement>) {
        // Prevent page reload on form submit
        e.preventDefault()

        // Get form element
        const form = e.currentTarget

        // Extract input values from the form fields
        const name = (form.elements.namedItem("name") as HTMLInputElement).value
        const surName = (form.elements.namedItem("surname") as HTMLInputElement).value
        const email = (form.elements.namedItem("email") as HTMLInputElement).value
        const password = (form.elements.namedItem("password") as HTMLInputElement).value

        // Create body using URLSearchParams
        const body = new URLSearchParams()

        // Append input values to the request body
        body.append('name', name)
        body.append('surname', surName)
        body.append('email', email)
        body.append('password', password)

        // Backend signup endpoint
        const url = 'http://localhost:3000/login'

        // POST request to the backend and handle response
        fetch(url, { method: 'POST', body: body })
            .then((res) => res.json())
            .then((data) => {
                // Save the returned user data globally
                setUserData(data)
                // Clear any previous error
                setError(null)
            })
            .catch((error) => {
                console.error(error);
                // Show error message to the user
                setError('Something went wrong - try again')
            })
    }

    // Debug: log userData to the console
    console.log('UserData: ', userData);

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
                        <Input type="text" name="name" autoComplete="name" label="Name" />
                        <Input type="text" name="surname" autoComplete="surname" label="Surname" />
                        <Input type="email" name="email" autoComplete="email" label="Email" />
                        <Input type="password" name="password" autoComplete="current-password" label="Password" />

                        {/* Submit button */}
                        <Submit className={style.button} value="Sign up" />
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