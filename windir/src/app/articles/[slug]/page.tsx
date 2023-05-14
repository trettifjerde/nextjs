import PageHeader from '@/components/ui/article/page-header';
import PageContent from '@/components/ui/article/page-content';
import { getPage } from '@/util/markdown';
import fs from 'fs';
import path from 'path';
import ReactMarkdown  from 'react-markdown';

function Article({params}: {params: {slug: string}}) {
    const {slug} = params;
    const {data, content} = getPage(slug + '.md');
    const {title, mainImage} = data;
    
    return(<PageContent className=''>
        <PageHeader title={title} image={mainImage}  />
        <ReactMarkdown>{content}</ReactMarkdown>
    </PageContent>)
}
export default Article;

export async function generateStaticParams() {
    
    return fs.readdirSync(path.join(process.cwd(), 'public', 'content'), {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(file => ({slug: file.name.replace(/.md/, '')}))
}