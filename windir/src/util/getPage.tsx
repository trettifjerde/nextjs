import matter from "gray-matter";
import fs from 'fs';
import { PageData } from "./types";
import path from "path";

export default function getPage(name: string, other=false): {data: PageData, content: string} {
    const breadcrumbs = ['public', 'content'];
    if (other) breadcrumbs.push('other');

    const {data, content} = matter(fs.readFileSync(path.join(process.cwd(), ...breadcrumbs, name), 'utf-8'));
    
    return {data: data as PageData, content};
}