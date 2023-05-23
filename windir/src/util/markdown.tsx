
import Image from 'next/image';
import classes from '@/components/layout/page/styles/classes';

const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export function getCustomRenderers(styles?: string) {
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
            return <div className={`img-cont ${styles ? classes[styles]['img-cont'] : ''}`}>
                <Image src={src} alt={alt} fill sizes={sizes} />
            </div>
        },
        li(item: any) {
            return <li><div>{item.children}</div></li>
        },
        strong(item: any) {
            const text = item.children[0];
            if (text.startsWith('!!!')) {
                return <span className="attention">{text.slice(3)}</span>
            }
            else return <strong>{item.children}</strong>
        }
    }
}