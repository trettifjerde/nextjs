import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export function getAbout() {
    return fs.readFileSync(path.join(process.cwd(), 'public', 'content', 'other', 'about.md'), 'utf-8');
}

export function getPage(name: string) {
    try {
        const {data, content} = matter(fs.readFileSync(path.join(process.cwd(), 'public', 'content', name), 'utf-8'));
        return {data, content};
    }
    catch (error) {
        console.log('Error reading page file', name);
        console.log(error);
        return  {data: {}, content: ''}
    }
}