<script setup>
import { ref, watch } from 'vue'

const searchTerm = ref('')
const products = ref([])
const isLoading = ref(false)

function debounce(func, timeout = 500){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const findProducts = debounce(async term => {
  try {
    isLoading.value = true;

    const res = await fetch(`https://dummyjson.com/products/search?q=${term}&limit=10`);
    const data = await res.json();
  
    products.value = data.products
  
    return products
  } catch(e) {
    console.error('Error', e);
  } finally {
    isLoading.value = false
  }
})

watch(searchTerm, newTerm => {
  findProducts(newTerm)
});
</script>

<template>
  <div class="w-full h-full flex flex-col gap-5 justify-center items-center">
    <h1 class="text-4xl font-bold">Gift Search Bar</h1>
    <input type="text" class="p-2 border-2 border-gray-dark" v-model="searchTerm" placeholder="Start typing..." autofocus />
    <p v-if="isLoading">Loading...</p>
    <ul class="list-disc" v-else-if="(!isLoading && products.length > 0)">
      <li v-for="(item, index) in products" :key="item.id">
        <h3>{{ item.title }}</h3>
        <span>{{ item.description }}</span>
      </li>
    </ul>
  </div>
</template>
