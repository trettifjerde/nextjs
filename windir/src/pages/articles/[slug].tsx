import { GetStaticPaths, GetStaticProps } from 'next';
import { PageData } from '@/util/types';
import { getPages, getPage } from '@/util/pages';
import { useState, useCallback, MouseEvent } from 'react';
import { getCustomRenderers } from "@/util/markdown";
import ReactMarkdown from 'react-markdown';
import ImgModal from "@/components/articles/img-modal";

function Article({data, content}: {data: PageData, content: string}) { 
    const [visible, setModal] = useState(false);
    const [src, setSrc] = useState('');
    
    const toggleImgModal = useCallback((e: MouseEvent) => {
        setModal(prev => {
            if (!prev) {
                const url = (e.target as HTMLImageElement).src;
                setSrc(url);
            }
            return !prev;
        })
    }, [setSrc, setModal]);

    return <>
        <ReactMarkdown components={getCustomRenderers(data.styles, toggleImgModal)}>{content}</ReactMarkdown>
        <ImgModal visible={visible} toggleModal={toggleImgModal} src={src} />
    </>
}
export default Article;

export const getStaticProps: GetStaticProps<{data: PageData, content : string}> = async (context) => {
    const slug = context.params?.slug;
    if (typeof slug === 'string') {
        const {data, content} = getPage(slug);
        return {props: {data, content}};
    }
    return {props: {data: {} as PageData, content: ''}};
}

export const getStaticPaths: GetStaticPaths = async() => {
    const pages = getPages();
    return {
        paths: pages.map(page => ({params: {slug: page}})),
        fallback: false
    }
}