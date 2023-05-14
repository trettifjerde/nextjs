import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getCustomRenderers, getPage } from "@/util/markdown";
import PageContent from "@/components/ui/article/page-content";

const {data, content} = getPage('about.md', true);
const metaInfo = {title: data.title, mainImage: data.mainImage, styles: data.styles};

function About() {
    return <PageContent className="about" data={metaInfo}>
        <ReactMarkdown components={getCustomRenderers(data.styles)}>{content}</ReactMarkdown>
    </PageContent>
}
export default About;