export const storageService = {
  getKey,
  setKey
}

function getKey(key: string) {
  const value = localStorage.getItem(key) || undefined
  return value
}

function setKey(key: string) {
  localStorage.setItem('token', key)
  return
}
