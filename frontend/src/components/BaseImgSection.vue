<template>
  <div
    class="flex gap-20 my-11 flex-col justify-between bg-gray-light dark:bg-darkMode-gray-light py-16 md:px-4 px-0 w-full"
    :class="{ 'md:flex-row': !props.reverse, 'md:flex-row-reverse': props.reverse }">
    <div class="flex flex-col justify-center items-center mt-12">
      <div class="max-w-[25rem] text-center flex flex-col justify-center items-center">
        <BaseTitle :title="props.title" :animate="props.animate" />
      </div>
      <p v-motion-fade-visible class="font-normal mt-10 text-center text-gray-dark">
        {{ props.description }}
      </p>
        <router-link to="/soon" v-motion-fade-visible
          class="bg-transparent mt-10 hover:bg-green-dark text-green hover:text-white font-bold py-2 px-4 border-2 border-green hover:border-green-dark rounded-full duration-200">
          Learn more
        </router-link>
    </div>
    <div v-motion-fade-visible class="flex flex-shrink w-11/12 sm:w-3/4 m-auto md:w-2/3 lg:w-2/6">
      <img loading="lazy" :src="props.imgPath" class="rounded-md mx-auto w-full" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  imgPath: String,
  reverse: { type: Boolean, default: false },
  animate: { type: Boolean, default: false }
});
</script>
