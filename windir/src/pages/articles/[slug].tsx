import ReactMarkdown  from 'react-markdown';
import { getCustomRenderers } from '@/util/markdown';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PageData } from '@/util/types';
import { getPages, getPage } from '@/util/pages';

function Article({data, content}: {data: PageData, content: string}) {   
    return <ReactMarkdown components={getCustomRenderers(data.styles)}>{content}</ReactMarkdown>
}
export default Article;

export const getStaticProps: GetStaticProps<{data: PageData, content : string}> = async (context) => {
    const slug = context.params?.slug;
    if (typeof slug === 'string') {
        const {data, content} = getPage(slug);
        return {props: {data, content}};
    }
    return {props: {data: {} as PageData, content: ''}};
}

export const getStaticPaths: GetStaticPaths = async() => {
    const pages = getPages();
    return {
        paths: pages.map(page => ({params: {slug: page}})),
        fallback: false
    }
}