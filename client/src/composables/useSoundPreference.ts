import { ref, type Ref } from 'vue'

export function useSoundPreference(): {
  soundEnabled: Ref<boolean | null>
  setSoundEnabled: (value: boolean) => void
} {
  const soundEnabled = ref<boolean | null>(null)

  function setSoundEnabled(value: boolean) {
    soundEnabled.value = value
  }

  return { soundEnabled, setSoundEnabled }
}
