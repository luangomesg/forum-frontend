const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function api(endpoint: string, options?: RequestInit,) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        credentials: 'include',
        headers: {'Content-Type': 'application/json'}, ...options
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message || 'Erro ao conectar com o servidor')
    return data
}