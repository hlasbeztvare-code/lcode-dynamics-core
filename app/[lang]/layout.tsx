import SmoothScroll from '@/components/SmoothScroll'

export default async function LangLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      {children}
    </SmoothScroll>
  )
}

