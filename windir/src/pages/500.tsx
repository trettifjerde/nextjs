import { GetStaticProps } from "next";

export default function Page500() {
    return <></>
}

export const getStaticProps: GetStaticProps = async(context) => {
    return {
        props: {
            data: {styles: 'error', title: '500', image: ''}
        }
    }
}