import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getCustomRenderers, getPage } from "@/util/markdown";
import PageContent from "@/components/article/page-content";

const {data, content} = getPage('about.md', true);

function About() {
    return <PageContent data={data}>
        <ReactMarkdown components={getCustomRenderers(data.styles)}>{content}</ReactMarkdown>
    </PageContent>
}
export default About;