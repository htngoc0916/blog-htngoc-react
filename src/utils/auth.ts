const ACCESS_TOKEN_KEY = 'htn_access_token'
const REFRESH_TOKEN_KEY = 'htn_refresh_token'
export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
export const getToken = () => {
  const access_token = localStorage.getItem(ACCESS_TOKEN_KEY)
  return access_token
}
export const getFreshToken = () => {
  const fresh_token = localStorage.getItem(REFRESH_TOKEN_KEY)
  return fresh_token
}

export const saveToken = (access_token: string, refresh_token: string) => {
  if (access_token && refresh_token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
  }
}
