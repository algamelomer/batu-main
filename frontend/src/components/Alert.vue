<template>
    <div class="w-full sm:max-w-md absolute top-8 right-1/2 translate-x-1/2 px-6">
        <div
            class="relative block w-full p-4 mb-4 text-base leading-5 text-white rounded-lg opacity-100 font-regular" :class=" color ">
            
            {{ alertMessage }}
        </div>
    </div>
</template>
  
<script setup>

const props = defineProps({
    alertMessage: String,
    color: String
});
</script>
  