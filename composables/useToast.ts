import { ref } from 'vue'

const toastPopupOpen = ref(false)
const toastMessageRef = ref('')
let toastTimer: number | null = null

export function useToast() {
  const showToast = (message: string) => {
    if (toastTimer !== null) {
      clearTimeout(toastTimer)
    }
    
    toastPopupOpen.value = true
    toastMessageRef.value = message
    
    toastTimer = window.setTimeout(() => {
      toastPopupOpen.value = false
      toastTimer = null
      setTimeout(() => {
        toastMessageRef.value = ''
      }, 300)
    }, 6000)
  }

  const clearToast = () => {
    if (toastTimer !== null) {
      clearTimeout(toastTimer)
      toastTimer = null
    }
    toastPopupOpen.value = false
    toastMessageRef.value = ''
  }

  return {
    toastPopupOpen,
    toastMessageRef,
    showToast,
    clearToast
  }
}