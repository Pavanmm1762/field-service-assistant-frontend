import axiosInstance from '../../../lib/axios'
import { MOCK_CHAT_RESPONSES } from '../../../lib/constants'

// let responseIndex = 0

export async function sendMessage(message) {

  // await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800))

  const response = await axiosInstance.post('/chat', { message })
  return response.data.message

  // const reply = MOCK_CHAT_RESPONSES[responseIndex % MOCK_CHAT_RESPONSES.length]
  // responseIndex++
  // return reply
}
