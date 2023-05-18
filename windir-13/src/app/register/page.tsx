import PageContent from '@/components/article/page-content';
import RegisterForm from "@/components/register/register-form";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Register() {
    const session = await getServerSession(authOptions);

    if (session) redirect('/');

    else {
        return <PageContent data={{image: '', title: 'Заявка в отряд', styles: ''}}>
            <RegisterForm />
        </PageContent>
    }
}