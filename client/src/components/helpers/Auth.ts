import { Buffer } from 'buffer'
import { Payload } from './Interfaces'

const tokenName = 'MEDITATION-LOGIN-TOKEN'

export const getPayload = (): Payload | string => {
  const token = localStorage.getItem(tokenName)
  //console.log('TOKEN FROM STORAGE', token)
  if (!token) return ''
  const splitToken = token.split('.')
  //console.log('SPLIT TOKEN', splitToken)
  const payloadString = splitToken[1]
  //console.log('PAYLOAD STRING', payloadString)
  const value: Payload = JSON.parse(Buffer.from(payloadString, 'base64').toString())
  console.log('VALUE', value)
  return value
}

export const isAuthenticated = (): boolean => {
  const payload = getPayload()
  if (typeof payload === 'string') return false
  const currentTime = Date.now() / 1000
  return currentTime < payload.exp

}

export const removeToken = (): void => {
  localStorage.removeItem(tokenName)
}