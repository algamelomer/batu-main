<template>
    <div class="grid gap-5 grid-cols-1 lg:grid-cols-2 justify-center m-auto w-full pt-4" v-if="apiData">
        <slot />
    </div>
</template>
  
<script setup>
const props = defineProps({
    apiData: {
        type: [String, Boolean, Array],
        default: () => []
    }
});
</script>
  