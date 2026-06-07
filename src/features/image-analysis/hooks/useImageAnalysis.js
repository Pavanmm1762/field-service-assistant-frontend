import { useState, useCallback } from 'react'
import { uploadImage, resetSession } from '../api/imageApi'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE_MB } from '../../../lib/constants'

export function useImageAnalysis() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const validateFile = (f) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
      return 'Only PNG, JPG, and JPEG files are supported.'
    }
    if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `File size must be under ${MAX_FILE_SIZE_MB}MB.`
    }
    return null
  } 

  const selectFile = useCallback((f) => {
    setError(null)
    setResult(null)
    const validationError = validateFile(f)
    if (validationError) {
      setError(validationError)
      return false
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    return true
  }, [])

  const clearFile = useCallback(async () => {
    try {
      await resetSession()
    } catch (error) {
      console.error(
        'Failed to reset session',
        error
      )
      setError(error.message || 'Failed to reset session. Please try again.')
    }

    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }, [preview])

  const analyze = useCallback(async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const data = await uploadImage(file)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [file])

  return { file, preview, result, loading, error, selectFile, clearFile, analyze }
}
