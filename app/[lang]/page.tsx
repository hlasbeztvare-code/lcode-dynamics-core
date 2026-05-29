import ClientPage from './ClientPage';

export function generateStaticParams() {
  return [{ lang: 'cs' }, { lang: 'en' }];
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ClientPage params={{ lang }} />;
}
