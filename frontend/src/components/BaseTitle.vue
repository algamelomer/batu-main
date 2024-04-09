<template>
  <div
    class="flex flex-col justify-center items-center w-fit"
    v-visible="visibilityChanged"
  >
    <h1
      class="text-green-dark text-center font-bold !text-3xl sm:!text-4xl"
      :class="titleClasses"
      @animationend="onAnimationEnd"
    >
      {{ title }}
    </h1>
    <hr width="50px" class="border-black border-[1.5px] mt-5" />
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    title: String,
    size: { type: String, default: "text-4xl" },
    animate: { type: Boolean, default: false },
  },
  setup(props) {
    const animationFinished = ref(false);
    const isVisible = ref(false);

    const onAnimationEnd = () => {
      animationFinished.value = true;
    };

    const titleClasses = computed(() => {
      const baseClasses = props.size;
      const animationClasses =
        !animationFinished.value && props.animate && isVisible.value
          ? "overflow-hidden border-r-[.15em] border-green-dark whitespace-nowrap animate-typewriter animate-blink"
          : "";
      return `${baseClasses} ${animationClasses}`.trim();
    });

    const visibilityChanged = () => {
      isVisible.value = true;
    };

    return {
      onAnimationEnd,
      titleClasses,
      visibilityChanged,
    };
  },
};
</script>
