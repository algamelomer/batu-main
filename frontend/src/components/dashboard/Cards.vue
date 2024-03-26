<template>
  <div class="max-w-sm rounded overflow-hidden relative shadow-lg bg-gray-700 m-auto w-96 h-[30rem]">
    <div class=" h-80">
      <img loading="lazy"  class="w-full h-full object-cover" :src="item.logo || item.image || item.file || item.iconPath" :alt="item.name || item.title">
    </div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ item.name || item.title }}</div>
    </div>
    <div class="px-6 pt-4 pb-2 flex justify-between absolute bottom-2 w-full">
      <button @click="handleEdit(item.id)"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">edit</button>
      <button @click="handleDelete(item.id)"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-500 rounded">delete</button>
    </div>
  </div>
</template>
  
<script setup>
const props = defineProps({
  item: Object,
  handleEdit: Function,
  handleDelete: Function
});
</script>
  