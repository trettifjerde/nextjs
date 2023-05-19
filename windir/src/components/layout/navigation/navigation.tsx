import { MouseEventHandler, useCallback, useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import Link from 'next/link';
import classes from './navigation.module.css';
import { useSession } from 'next-auth/react';

function Navigation() {

    const [dark, setTheme] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const {data: session} = useSession();

    const scrollUp = useCallback(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    const toggleMenu : MouseEventHandler = useCallback((e) => {
        setMenuOpen(prev => {
            const n = !prev;
            if (n) {
                document.addEventListener('click', setMenuOpen.bind(null, false), {once: true});
                e.stopPropagation();
            }
            return n;
        })
    }, [setMenuOpen]);

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
        <nav className={`${classes.nav} ${dark ? classes.dark : ''} ${menuOpen ? classes.open : ''}`}>
            <ul className={`${classes.list} ${classes.burger}`}>
                <li className={classes['nav-btn']} onClick={toggleMenu}>{menuOpen ? 'x': 'iii'}</li>
            </ul>
            <CSSTransition in={menuOpen} timeout={300} classNames='slide'>
                <ul className={`${classes.list} ${classes.menu} slide`}>
                    <Link scroll={false} href="/games"><li>Игры</li></Link>
                    <Link scroll={false} href="/articles/mods"><li>Настройка модов</li></Link>
                    <Link scroll={false} href="/articles/skills"><li>Программа-минимум</li></Link>
                    <Link scroll={false} href="/articles"><li>Статьи</li></Link>
                    <Link scroll={false} href="/about"><li>Об отряде</li></Link>
                    {!session && <Link scroll={false} href="/register"><li>Заявка в отряд</li></Link>}
                </ul>
            </CSSTransition>
            <ul className={`${classes.list} ${classes.btns}`}>
                <li className={classes['nav-btn']} title="наверх" onClick={scrollUp}>t</li>
                <li className={classes['nav-btn']} title="сменить тему">o</li>
            </ul>
        </nav>
    )
}
export default Navigation