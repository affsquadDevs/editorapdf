import { notFound } from 'next/navigation'

interface Props {
	params: { segments: string[] }
}

export default function LocaleCatchAllRedirect({ params }: Props) {
	void params
	notFound()
}

