import matter from "gray-matter";
import fs from 'fs';
import { PageData } from "./types";
import path from "path";

export function getPage(name: string, other=false): {data: PageData, content: string} {
    const breadcrumbs = ['public', 'content'];
    const pageName = name.endsWith('.md') ? name : name + '.md';
    if (other) breadcrumbs.push('other');

    const {data, content} = matter(fs.readFileSync(path.join(process.cwd(), ...breadcrumbs, pageName), 'utf-8'));
    
    return {data: data as PageData, content};
}

export function getPages() {
    const filenames = fs.readdirSync(path.join(process.cwd(), 'public', 'content'), {withFileTypes: true});
    const pages = filenames.filter(file => !file.isDirectory()).map(file => file.name.replace('.md', ''));
    return pages;
}