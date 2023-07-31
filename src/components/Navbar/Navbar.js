import Link from "next/link"
import classes from "./Navbar.module.css"

const Navbar = () => {
    return <div className={classes.NavBarWrapper}>
        <Link href={"/"}>
            <button className={classes.MenuButton}>Главная </button>
        </Link>
        <Link href={"/users"}>
            <button className={classes.MenuButton}>Пользователи </button>
        </Link>
    </div>

}

export default Navbar
