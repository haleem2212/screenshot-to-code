import { create } from 'zustand'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface DesignElement {
  type: string
  properties: Record<string, any>
  children?: DesignElement[]
}

export interface DesignState {
  originalImage: string | null
  currentDesign: DesignElement | null
  messages: Message[]
  isProcessing: boolean
  exportType: 'code' | 'prompt' | null
  
  // Actions
  setOriginalImage: (image: string) => void
  setCurrentDesign: (design: DesignElement) => void
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setIsProcessing: (processing: boolean) => void
  setExportType: (type: 'code' | 'prompt' | null) => void
  reset: () => void
}

export const useDesignStore = create<DesignState>((set) => ({
  originalImage: null,
  currentDesign: null,
  messages: [],
  isProcessing: false,
  exportType: null,

  setOriginalImage: (image) => set({ originalImage: image }),
  
  setCurrentDesign: (design) => set({ currentDesign: design }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    }]
  })),
  
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  
  setExportType: (type) => set({ exportType: type }),
  
  reset: () => set({
    originalImage: null,
    currentDesign: null,
    messages: [],
    isProcessing: false,
    exportType: null
  })
}))
