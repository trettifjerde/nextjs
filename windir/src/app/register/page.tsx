import PageContent from '@/components/article/page-content';
import RegisterForm from "@/components/register/register-form";

export default function Register() {
    return <PageContent data={{image: '', title: 'Заявка в отряд', styles: ''}}>
        <RegisterForm />
    </PageContent>
}