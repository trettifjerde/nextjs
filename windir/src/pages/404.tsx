import { GetStaticProps } from "next";

export default function Page404() {
    return <></>
}

export const getStaticProps: GetStaticProps = async(context) => {
    return {
        props: {
            data: {styles: 'error', title: '404', image: ''}
        }
    }
}