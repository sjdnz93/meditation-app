import { Buffer } from 'buffer'

const tokenName = 'MEDITATION-LOGIN-TOKEN'

export const getPayload = () => {
  const token = localStorage.getItem(tokenName)
  //console.log('TOKEN FROM STORAGE', token)
  if (!token) return
  const splitToken = token.split('.')
  //console.log('SPLIT TOKEN', splitToken)
  const payloadString = splitToken[1]
  //console.log('PAYLOAD STRING', payloadString)
  const value = JSON.parse(Buffer.from(payloadString, 'base64').toString())
  //console.log('VALUE', value)
  return value
}

export const isAuthenticated = (): boolean => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Date.now() / 1000
  return currentTime < payload.exp

}