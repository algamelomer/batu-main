<template>
  <div
    class="bg-gray-light dark:bg-darkMode-gray-light mt-[4rem] mr-7 basis-6/12 flex flex-col items-center justify-around"
  >
    <img loading="lazy"  :src="imgPath" class="w-96" />
    <h1 class="text-green-dark font-black text-3xl text-center">
      {{ title }}
    </h1>
    <transition name="fade">
      <p class="text-center pb-20 text-gray-500">
        {{ description }}
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    imgPath: Boolean,
    title: String,
    description: String,
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
