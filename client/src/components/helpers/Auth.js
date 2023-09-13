import { Buffer } from 'buffer'
import axios from 'axios'

const tokenName = 'MEDITATION-LOGIN-TOKEN'

export const getPayload = () => {
  const token = localStorage.getItem(tokenName)
  console.log('TOKEN FROM STORAGE', token)
  if (!token) return
  const splitToken = token.split('.')
  console.log('SPLIT TOKEN', splitToken)
  const payloadString = splitToken[1]
  console.log('PAYLOAD STRING', payloadString)
  const value = JSON.parse(Buffer.from(payloadString, 'base64'))
  console.log('VALUE', value)
  //const parsedPayload = Buffer.from(payloadString, 'base64')
  // console.log('PARSED PAYLOAD', parsedPayload)
  // console.log('PAYLOAD', JSON.parse(parsedPayload.toString()))
  // const value = JSON.parse(parsedPayload.toString())
  //return value
}