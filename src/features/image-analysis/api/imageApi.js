import axiosInstance from '../../../lib/axios'
import { MOCK_ANALYSIS_RESPONSE } from '../../../lib/constants'

export async function uploadImage(file) {
  const formData = new FormData()

  formData.append('file', file)
 
  const response = await axiosInstance.post('/image/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  console.log("API RESPONSE:", response.data)
  return response.data

}

export async function resetSession() {
  const response = await axiosInstance.post('/session/reset')
  console.log("Session reset response:", response.data)
}