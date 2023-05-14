import PageHeader from '@/components/ui/article/page-header';
import PageContent from '@/components/ui/article/page-content';
import { getCustomRenderers, getPage } from '@/util/markdown';
import fs from 'fs';
import path from 'path';
import ReactMarkdown  from 'react-markdown';

function Article({params}: {params: {slug: string}}) {
    const {slug} = params;
    const {data, content} = getPage(slug + '.md');
    const metaInfo = {title: data.title, mainImage: data.mainImage, styles: data.styles};
    
    return <PageContent className="about" data={metaInfo}>
        <ReactMarkdown components={getCustomRenderers(data.styles)}>{content}</ReactMarkdown>
    </PageContent>
}
export default Article;

export async function generateStaticParams() {
    
    return fs.readdirSync(path.join(process.cwd(), 'public', 'content'), {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(file => ({slug: file.name.replace(/.md/, '')}))
}