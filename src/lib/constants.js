export const API_BASE_URL = 'http://localhost:8000/api'

export const SEVERITY_LEVELS = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
}

export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']
export const MAX_FILE_SIZE_MB = 10

export const MOCK_ANALYSIS_RESPONSE = {
  equipment: 'Router',
  issue: 'Damaged Ethernet Port',
  severity: 'Medium',
  confidence: 92,
}

export const MOCK_CHAT_RESPONSES = [
  'Disconnect power, inspect the RJ45 connector, replace the damaged port, and reboot the router.',
  'Based on the diagnostic, I recommend checking the port integrity first. Use a cable tester to confirm the fault before replacing.',
  'This is a known hardware failure pattern. Order part #RJ45-CAT6-PORT and follow the replacement procedure in the maintenance manual section 4.3.',
  'Escalation recommended if the port replacement does not resolve the issue. Firmware corruption may be a secondary factor.',
]

export const APP_NAME = 'FieldServe AI'
export const APP_TAGLINE = 'AI-Powered Field Diagnostics'
