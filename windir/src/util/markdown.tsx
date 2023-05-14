import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Image from 'next/image';

const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export function getPage(name: string, other=false) {
    try {
        const breadcrumbs = ['public', 'content'];
        if (other) breadcrumbs.push('other');
        const {data, content} = matter(fs.readFileSync(path.join(process.cwd(), ...breadcrumbs, name), 'utf-8'));
        return {data, content};
    }
    catch (error) {
        console.log('Error reading page file', name);
        console.log(error);
        return  {data: {}, content: ''}
    }
}

export function getCustomRenderers(clName='img-cont') {
    return {
        p(paragraph: {node: any, children: any}) {
            const {node} = paragraph;
            if (node.children[0].tagName && node.children[0].tagName === 'img') {
                const {src, alt} = node.children[0].properties;
                return <div className={clName}>
                    <Image src={src} alt={alt} fill sizes={sizes} />
                </div>
            }
            else 
                return <p>{paragraph.children}</p>
        }
    }
}