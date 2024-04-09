<template>
    <div class="flex justify-around h-[33.28px] lg:h-[60.5px] mt-3 items-center">
        <h1 class="text-center items-center flex">{{ buttonText }}</h1>
        <button @click="handleClick"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 border border-gray-500 rounded h-10 lg:h-12">
            {{ buttonLabel }}
        </button>
    </div>
</template>
  
<script setup>
const props = defineProps({
    buttonText: String,
    buttonLabel: String,
    handleClick: Function
});
</script>
  