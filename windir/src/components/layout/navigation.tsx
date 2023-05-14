'use client';
import { useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import classes from './navigation.module.css';

function Navigation() {

    const [dark, setTheme] = useState(false);

    const scrollUp = useCallback(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    useEffect(() => {
        let timer: any;
        const handleScroll = () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                const darkTheme = window.scrollY > (screen.height - 200);
                if (dark !== darkTheme) setTheme(darkTheme)
                timer = null;
            }, 50);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timer) clearTimeout(timer);
        }
    }, [dark, setTheme]);

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
            <ul className={classes.list}>
                <li className={classes['nav-btn']} title="наверх" onClick={scrollUp}>t</li>
                <li className={classes['nav-btn']} title="сменить тему">o</li>
            </ul>
        </nav>
    )
}
export default Navigation