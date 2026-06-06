import { useState, useCallback, useRef, useEffect } from 'react'
import { sendMessage } from '../api/chatApi'

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 'sys-1',
      role: 'assistant',
      content: 'Hello, I\'m your Field Service AI. Upload an equipment image to begin diagnostics, or ask me anything about your field equipment.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const send = useCallback(async (text) => {
    const content = text?.trim() || input.trim()
    if (!content) return

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const reply = await sendMessage(content)
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      const errMsg = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an issue processing your request. Please try again.',
        timestamp: new Date(),
        isError: true,
      }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setIsTyping(false)
    }
  }, [input])

  return { messages, input, setInput, isTyping, send, messagesEndRef }
}
