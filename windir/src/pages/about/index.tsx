import { getCustomRenderers } from "@/util/markdown"
import { getPage } from "@/util/pages"
import { PageData } from "@/util/types"
import { GetStaticProps } from "next"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

export default function About({data, content}: {data: PageData, content: string}) {
  return <ReactMarkdown components={getCustomRenderers(data.styles)}>{content}</ReactMarkdown>
}

export const getStaticProps: GetStaticProps<{data: PageData, content: string}> = async() => {
    const {data, content} = getPage('about', true);
    return {props: {data, content}}
}