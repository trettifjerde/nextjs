
import classes from './page-content.module.css'

export default function PageContent({children}: {children: React.ReactNode}) {
    return (
        <section className={classes.content}>{children}</section>
    )
}