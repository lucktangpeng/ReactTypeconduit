export const getStorageUser = () => {
  const user = window.localStorage.getItem("userInfo")
  return user
}