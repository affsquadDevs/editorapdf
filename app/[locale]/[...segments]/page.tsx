import { redirect } from 'next/navigation'

interface Props {
	params: { segments: string[] }
}

export default function LocaleCatchAllRedirect({ params }: Props) {
	const path = params.segments?.length ? `/${params.segments.join('/')}` : '/'
	// Redirect /{locale}/... → /...
	redirect(path)
}

