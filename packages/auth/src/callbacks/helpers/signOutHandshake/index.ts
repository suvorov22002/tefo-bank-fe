import { JWT } from 'next-auth/jwt'

export const signOutHandshake = async (token: JWT, providerBaseUrl: string) => {
  try {
    const params = new URLSearchParams()

    params.append('id_token_hint', token.idToken || '')

    const url = `${providerBaseUrl}/logout?${params.toString()}`

    await fetch(url)
  } catch (e) {
    console.error('Logout error', e)
  }
}
