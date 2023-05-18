import ReactMarkdown  from 'react-markdown';
import PageContent from '@/components/page/page-content';
import { getCustomRenderers } from '@/util/markdown';
import getPage from '@/util/getPage';
import { GetStaticPaths } from 'next';
import { PageData } from '@/util/types';

function Article({data, content}: {data: PageData, content: string}) {   
    return <PageContent data={data}>
        <ReactMarkdown components={getCustomRenderers(data.styles)}>{content}</ReactMarkdown>
    </PageContent>
}
export default Article;

export const getStaticPaths: GetStaticPaths = async({}) => {
    return {
        paths: [],
        fallback: false
    }
}

export async function getStaticProps(context: {params: {slug: string}}) {
    const slug = context.params.slug;
    const {data, content} = getPage(slug + '.md');
    return {data, content}
}