<!-- components/NewsCard.vue -->
<template>
  <div :class="{ 'active-card': props.isActive }"
    class="m-auto card w-96 h-44 bg-gray-light cursor-pointer flex transition duration-1000 ease-in-out "
    @click="$emit('handleClick', props.item)">
    <div class="w-1/3 h-full">
      <img loading="lazy"  :src="props.item.file" alt="" class="w-full h-full object-cover">
    </div>
    <div class="w-2/3 flex items-center px-3">
      <div>
        <h3 class="text-green text-start text-lg font-semibold">{{ props.item.title }}</h3>
        <p class="pr-2 text-[#7d7987] text-start text-xs">{{ props.truncatedDescription(props.item.description, props.numWordsToShow) }}</p>
      </div>
      <div class="w-8 h-8">
        <span class="w-8 h-8 rounded-full bg-green flex items-center text-center text-white justify-center">
          <font-awesome-icon :icon="['fas', 'angle-up']" rotation="90" />
        </span>
      </div>
    </div>
  </div>
</template>
  
<script setup>
const props = defineProps({
  item: Object,
  isActive: Boolean,
  truncatedDescription: Function,
  numWordsToShow: Number,
})
</script>
  
<style scoped>
.active-card {
  @apply !bg-[#2d7c7f]
}

.active-card h3 {
  @apply text-green-dark
}

.active-card p {
  @apply text-[#99d9db]
}

.card:hover {
  @apply active-card
}
</style>
  