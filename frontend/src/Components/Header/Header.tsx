import headerImg from '../../assets/Img/Logo-mobile.svg'
import style from '../Header/Header.module.scss'

interface Headerprops {
    headerLogo?: string;
    title?:string;
}
 export function Header ({ headerLogo = headerImg, title= ''}: Headerprops){
    return (
    <>
    <img className={style.headerLogo} src={headerLogo} alt="HeaderLogo" />
    <h1 className={style.titletext}>{title}</h1>

    </>
    );
}
