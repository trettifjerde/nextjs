import RegisterForm from "@/components/register/register-form";
import { PageData } from '@/util/types';
import { GetStaticProps } from 'next';

export default function Register({data}: {data: PageData}) {
    return <RegisterForm />
}

export const getStaticProps: GetStaticProps<{data: PageData}> = async () => {
    return {
        props: {
            data: {image: '', title: 'Заявка в отряд', styles: ''}
        }
    }
};