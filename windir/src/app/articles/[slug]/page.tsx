import fs from 'fs';
import path from 'path';

function Article({params}: {params: {slug: string}}) {
    return(<div>{params.slug}</div>)
}
export default Article;

export async function generateStaticParams() {
    
    return fs.readdirSync(path.join(process.cwd(), 'public', 'content'), {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(file => ({slug: file.name}))
}