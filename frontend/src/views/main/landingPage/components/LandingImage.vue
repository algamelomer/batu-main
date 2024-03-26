<template>
  <div class="w-full h-[45rem] overflow-hidden relative">
    <img loading="lazy"  src="@assets/college.png" alt="" class="w-full h-full brightness-90 object-cover blur-sm" />

    <img loading="lazy"  src="@assets/logo.png"
      class="absolute top-5 hover:animate-Bpulse inset-0 mx-auto my-auto sm:mt-auto sm:mb-[25rem] w-96 filter grayscale brightness-[4]"
      alt="logo" />

    <BatuCounter class="hidden sm:flex justify-center absolute inset-0 mx-auto mb-auto mt-[20rem]" :counter="props.counter" :color="color"/>
  </div>
</template>

<script setup>
import BatuCounter from "@/views/main/landingPage/components/BatuCounter.vue";
const props = defineProps({
  counter: Array,
  color: String,
})
</script>
