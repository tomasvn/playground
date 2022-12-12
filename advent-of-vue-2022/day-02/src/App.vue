<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="max-w-xs w-full flex flex-col">
      <div class="w-3/4 p-4 rounded-2xl bg-teal-800 text-white self-start" v-if="isLoading">Loading...</div>
      <div class="w-3/4 p-4 rounded-2xl bg-teal-800 text-white self-start" v-else>{{ setup }}</div>
      <div class="w-3/4 mt-2 p-4 rounded-2xl bg-red-800 text-white self-end" v-if="showDelivery">{{ delivery }}</div>
      <button class="bg-green col-span-1 rounded-lg py-2 hover:opacity-90 w-full mx-auto mt-4" type="button" @click="handleDiffText">{{ diffText }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const setup = ref("")
const delivery = ref("")
const isLoading = ref(false)
const showDelivery = ref(false);
const diffText = ref("Tell Me!")

const getJoke = async() => {
  try {
    isLoading.value = true

    const res = await fetch('https://v2.jokeapi.dev/joke/christmas')
    const data = await res.json();

    setup.value = data.setup
    delivery.value = data.delivery

  } catch(e) {
    console.error("Error", e)

  } finally {
    isLoading.value = false
  }
}

const handleDiffText = () => {
  diffText.value = "Tell Me!"
  showDelivery.value = !showDelivery.value;

  if (showDelivery.value) {
    diffText.value = 'Another'
  } else {
    getJoke()
  }
}

getJoke();
</script>
