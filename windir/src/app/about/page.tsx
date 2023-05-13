import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getAbout } from "@/util/markdown";
import PageContent from "@/components/ui/page-content";

const about = getAbout();

function About() {
    return <PageContent>
            <ReactMarkdown>{about}</ReactMarkdown>
    </PageContent>
}
export default About;