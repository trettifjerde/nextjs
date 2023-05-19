import { PageData } from "@/util/types"
import { GetStaticProps } from "next"

export default function Index() {
  return <></>
}

export const getStaticProps: GetStaticProps<{data: PageData | null}> = async() => {
  return {props: {data: {image: '', styles: 'index', title: ''}}}
}