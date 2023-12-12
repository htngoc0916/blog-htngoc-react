const ACCESS_TOKEN_KEY = 'htn_access_token'
export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}
export const getToken = () => {
  const access_token = localStorage.getItem(ACCESS_TOKEN_KEY)
  return access_token
}
export const saveToken = (access_token: string) => {
  if (access_token) {
    localStorage.setItem('access_token', access_token)
  }
}
