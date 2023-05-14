
import contentClasses from './page-content.module.css';
import PageHeader from './page-header';
import classes from './styles/classes';

export default function PageContent({children, className, data}: 
    {children: React.ReactNode, className: string, data: {
        mainImage: string,
        title: string,
        styles: string
    }}) {
    return (
        <main className={`${contentClasses.content} ${className in classes ? classes[className][className] : ''}`}>
            <PageHeader title={data.title} image={data.mainImage} />
            <section>{children}</section>
        </main>
    )
}