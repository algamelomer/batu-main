<template>
  <div
    class="grid grid-col-2 pb-20 pt-11 sm:grid-cols-3 gap-y-10 gap-x-6 justify-items-center items-center"
  >
    <div v-for="(card, index) in cards">
      <BaseCard
        :card="card"
        v-motion
        :initial="{ opacity: 0, x: -100 }"
        :visibleOnce="{
          opacity: 100,
          x: 0,
          transition: {
            delay: calculateDelay(index),
          },
        }"
      />
    </div>
  </div>
</template>

<script>
import BaseCard from "./BaseCard.vue";

export default {
  props: {
    cards: {
      type: Object,
      required: true,
    },
  },
  setup() {
    function calculateDelay(index) {
      return (index + 1) * 150;
    }
    return {
      calculateDelay,
    };
  },

  components: { BaseCard },
};
</script>
