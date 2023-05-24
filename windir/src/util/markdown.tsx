
import Image from 'next/image';
import classes from '@/components/layout/page/styles/classes';
import { MouseEvent } from 'react';

const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export function getCustomRenderers(styles='', onImgClick=(e: MouseEvent) => {}) {
    return {
        p(paragraph: {node: any, children: any}) {
            const {node} = paragraph;
            if (node.children[0].tagName && node.children[0].tagName === 'img') {
                const {src, alt} = node.children[0].properties;
                return <div className={`img-cont ${styles ? classes[styles]['img-cont'] : ''}`}>
                    <Image src={src} alt={alt} fill sizes={sizes} />
                </div>
            }
            else 
                return <p>{paragraph.children}</p>
        },
        img(image: any) {
            const {src, alt} = image.node.properties;
            return <div 
                className={`img-cont ${styles ? classes[styles]['img-cont'] : ''}`}>
                <Image src={src} alt={alt} fill sizes={sizes} onClick={onImgClick} />
            </div>
        },
        li(item: any) {
            const notImages = item.children.filter((child: any) => !child.props || !child.props.src);
            const images = item.children.filter((child: any) => child.props && child.props.src);
            return <li>
                <div className={styles ? classes[styles]['li-text'] : ''}>{notImages}</div>
                <div className={styles ? classes[styles]['li-imgs'] : ''}>{images}</div>
            </li>
        },
        strong(item: any) {
            const text = item.children[0];
            if (text.startsWith('!!!')) {
                return <span className="attention">{text.slice(3)}</span>
            }
            if (text.startsWith('!b!'))
                return <span className='b'>{text.slice(3)}</span>
            else return <strong>{item.children}</strong>
        }
    }
}