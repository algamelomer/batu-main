<template>
  <div class="w-full flex flex-col justify-center items-center bg-gray-light py-16">
    <iframe v-motion-fade-visible :src="props.video" class="w-[36rem] h-80"></iframe>
    <BaseTitle title="Definition of the department" :animate="true" class="mt-11" />
    <BaseSubtitle v-motion-fade-visible :subtitle="props.description" />
  </div>
</template>
<script setup>
const props = defineProps({
  video: String,
  description: String
})
</script>