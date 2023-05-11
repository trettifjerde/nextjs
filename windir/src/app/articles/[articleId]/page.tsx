import fs from 'fs';
import path from 'path';

function Article({params}: {params: {articleId: string}}) {
    return(<div>{params.articleId}</div>)
}
export default Article;

export async function generateStaticParams() {
    
    return fs.readdirSync(path.join(process.cwd(), 'public', 'content'), {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(file => ({articleId: file.name}))
}