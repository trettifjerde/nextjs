import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getCustomRenderers, getPage } from "@/util/markdown";
import PageContent from "@/components/ui/article/page-content";
import PageHeader from "@/components/ui/article/page-header";
import classes from './about.module.css';

const {data, content} = getPage('about.md', true);

function About() {
    return <PageContent className={classes.about}>
        <PageHeader title={data.title} image={data.mainImage} />
        <ReactMarkdown components={getCustomRenderers()}>{content}</ReactMarkdown>
    </PageContent>
}
export default About;