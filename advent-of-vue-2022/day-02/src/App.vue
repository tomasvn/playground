<template>
  <div class="w-full h-full flex justify-center items-center">
    <span class="text-3xl">Good luck!</span>
    <span>{{ setupJoke }}</span>
    <span>{{ deliveryJoke }}</span>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useGetJoke } from "./use-get-joke.js";

const { setup, delivery } = useGetJoke();

const setupJoke = computed(() => setup.value)
const deliveryJoke = computed(() => delivery.value)
</script>
