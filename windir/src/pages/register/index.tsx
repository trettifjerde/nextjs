import RegisterForm from "@/components/register/register-form";
import { PageData } from '@/util/types';
import { GetServerSideProps } from 'next';
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Register({zones}: {zones: string[]}) {
    const {data: session} = useSession();
    const router = useRouter();

    if (session){
        window.scrollTo({top: 0, behavior: 'smooth'});
        setTimeout(() => router.replace('/'), 300);
    }
    else
        return <RegisterForm zones={zones} />
}

export const getServerSideProps: GetServerSideProps<{data: PageData, zones: string[]}> = async({req, res}) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) 
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    else {
        const ru = new Intl.Locale('ru');
        return {
            props: {
                data: {image: '', title: 'Заявка в отряд', styles: 'register'},
                zones: Intl.supportedValuesOf('timeZone')
            }
        }
    }
}
