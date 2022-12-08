import { ref } from "vue";

export function useGetJoke() {
  const setup = ref("")
  const delivery = ref("")
  const isLoading = ref(false)

  const fetchData = async() => {
    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/christmas')
      const data = await res.json();

      isLoading.value = true

      setup.value = data.setup
      delivery.value = data.delivery
  
    } catch(e) {
      console.error("Error", e)
  
    } finally {
      isLoading.value = false
    }
  }

  fetchData()

  return {
    setup,
    delivery,
    isLoading
  }
}