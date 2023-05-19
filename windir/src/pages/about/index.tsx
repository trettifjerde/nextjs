import { getPage } from "@/util/pages"
import { PageData } from "@/util/types"
import { GetStaticProps } from "next"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

export default function About({content}: {content: string}) {
  return <ReactMarkdown>{content}</ReactMarkdown>
}

export const getStaticProps: GetStaticProps<{data: PageData, content: string}> = async() => {
    const {data, content} = getPage('about', true);
  return {
    props: {data, content}
  }
}