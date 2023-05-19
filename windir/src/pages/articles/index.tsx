import { PageData } from "@/util/types"
import { GetStaticProps } from "next"

export default function Articles({data}: {data: PageData}) {
    return <></>
}

export const getStaticProps: GetStaticProps<{data: PageData}> = async() => {
    return {
        props: {
            data: {image: '', title: 'Статьи', styles: 'articles'}
        }
    }
}