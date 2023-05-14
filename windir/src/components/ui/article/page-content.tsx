
import classes from './page-content.module.css'

export default function PageContent({children, className}: {children: React.ReactNode, className: string}) {
    return (
        <section className={`${classes.content} ${className}`}>{children}</section>
    )
}