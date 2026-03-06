import headerImg from '../../assets/Img/Logo-mobile.svg'

interface Headerprops {
    headerLogo?: string;
    title?:string;
}
 export function Header ({ headerLogo = headerImg, title= ''}: Headerprops){
    return (
    <>
    <img src={headerLogo} alt="HeaderLogo" />
    <h1>{title}</h1>

    </>
    );
}
