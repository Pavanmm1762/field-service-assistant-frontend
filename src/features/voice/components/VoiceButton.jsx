import { Mic, MicOff } from 'lucide-react'
import { useVoice } from '../hooks/useVoice'
export function VoiceButton() {
  const { recording, startRecording, stopRecording } = useVoice()
  return (
    <button onClick={recording ? stopRecording : startRecording} className="w-9 h-9 rounded-xl border border-surface-600 text-text-muted hover:text-cyan-400 flex items-center justify-center transition-colors">
      {recording ? <MicOff size={15} className="text-red-400" /> : <Mic size={15} />}
    </button>
  )
}
