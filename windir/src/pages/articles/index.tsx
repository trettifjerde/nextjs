import { PageData } from "@/util/types"
import { GetStaticProps } from "next"
import Link from "next/link";
import Image from "next/image";
import classes from "@/components/layout/page/styles/articles.module.css";

export default function Articles({data}: {data: PageData}) {
    return <>
        <Link className={classes.link} href="/articles/skills">
            <Image src="/images/prog_min_art.jpg" width={400} height={200} alt="Программа-минимум"/>
            <div >Программа-минимум</div>
        </Link>

        <Link className={classes.link} href="/articles/radio">
            <Image src="/images/radio_art.jpg" width={400} height={200} alt="Программа-минимум" />
            <div >Гайд по рации</div>
        </Link>

        <Link className={classes.link} href="/articles/mods">
            <Image src="/images/mods_art.jpg" width={400} height={200} alt="Программа-минимум" />
            <div >Настройка модов</div>
            
        </Link>

        <Link className={classes.link} href="/articles/medicine">
            <Image src="/images/combat_medic_art.jpg" width={400} height={200} alt="Программа-минимум" />
            <div >Медицина ACE 3</div>
        </Link>

        <Link className={classes.link} href="/articles/rocket">
            <Image src="/images/rpg_art.jpg" width={400} height={200} alt="Программа-минимум" />
            <div >Стрельба из РПГ-7</div>
            
        </Link>

        <Link className={classes.link} href="/articles/map">
            <Image src="/images/compas_art.jpg" width={400} height={200} alt="Программа-минимум" />
            <div >Ориентирование</div>
        </Link>
    </>
}

export const getStaticProps: GetStaticProps<{data: PageData}> = async() => {
    return {
        props: {
            data: {image: '', title: 'Статьи', styles: 'articles'}
        }
    }
}