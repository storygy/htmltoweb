import { ViewClient } from './ViewClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ViewPage({ params }: PageProps) {
  const { id } = await params
  return <ViewClient appId={id} />
}
