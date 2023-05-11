import Link from 'next/link';
import classes from './navigation.module.css';

function Navigation({dark} : {dark: boolean}) {
    return (
        <nav className={`${classes.nav} ${dark ? classes.dark : ''}`}>
            <ul className={classes.list}>
                <Link href="/games"><li>Игры</li></Link>
                <Link href="/articles/mods"><li>Настройка модов</li></Link>
                <Link href="/articles/skills"><li>Программа-минимум</li></Link>
                <Link href="/articles"><li>Статьи</li></Link>
                <Link href="/about"><li>Об отряде</li></Link>
                <Link href="/register"><li>Заявка в отряд</li></Link>
            </ul>
        </nav>
    )
}
export default Navigation