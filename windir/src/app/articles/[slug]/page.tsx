import PageContent from '@/components/ui/page-content';
import { getPage } from '@/util/markdown';
import fs from 'fs';
import path from 'path';
import ReactMarkdown  from 'react-markdown';

function Article({params}: {params: {slug: string}}) {
    const {slug} = params;
    const {data, content} = getPage(slug + '.md') 
    
    return(<PageContent>
        <ReactMarkdown>{content}</ReactMarkdown>
    </PageContent>)
}
export default Article;

export async function generateStaticParams() {
    
    return fs.readdirSync(path.join(process.cwd(), 'public', 'content'), {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(file => ({slug: file.name.replace(/.md/, '')}))
}