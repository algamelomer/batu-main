<template>
  <div class="w-screen flex flex-col justify-center items-center bg-gray-light dark:bg-darkMode-gray-light py-16">
    <BaseTitle title="Where can I work?" class="mt-11" :animate="true" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
      <div v-for="(job, index) in jobs" :key="index" v-motion :initial="{ opacity: 0, x: getXPosition(index) }" :visible="{
        opacity: 100,
        x: 0,
        transition: {
          duration: 300,
        },
      }"
        class="group flex justify-center items-center border border-green-dark hover:bg-green-dark rounded-full w-96 h-16 duration-200">
        <p class="text-green-dark group-hover:text-white duration-200">
          {{ job }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ Work: String })

const jobs = props.Work.split(',')

const getXPosition = computed(() => (index) => {
  return index % 2 === 0 ? -100 : 100;
});
</script>
