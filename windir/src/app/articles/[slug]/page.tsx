import fs from 'fs';
import path from 'path';

import ReactMarkdown  from 'react-markdown';
import PageContent from '@/components/article/page-content';

import { getCustomRenderers, getPage } from '@/util/markdown';

function Article({params}: {params: {slug: string}}) {
    const {slug} = params;
    const {data, content} = getPage(slug + '.md');
    
    return <PageContent data={data}>
        <ReactMarkdown components={getCustomRenderers(data.styles)}>{content}</ReactMarkdown>
    </PageContent>
}
export default Article;

export async function generateStaticParams() {
    
    return fs.readdirSync(path.join(process.cwd(), 'public', 'content'), {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(file => ({slug: file.name.replace(/.md/, '')}))
}