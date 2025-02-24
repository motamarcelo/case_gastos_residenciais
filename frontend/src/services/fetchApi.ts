// Se não tiver um .env com o atributo NEXT_PUBLIC_API_BASE_URL setado, por padrão ele procurar a porta 3000
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

export async function fetchApi(endpoint: string, options?: RequestInit) {
	const response = await fetch(`${baseUrl}${endpoint}`, options)
	if (!response.ok) {
		throw new Error(`Erro: ${response.status}`)
	}
	return response.json()
}
