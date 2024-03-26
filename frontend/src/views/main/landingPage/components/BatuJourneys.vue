<template>
  <div class="flex gap-20 my-11 flex-col sm:flex-row justify-evenly">
    <div class="flex flex-col justify-center items-center mt-12">
      <div
        class="w-[25rem] text-center flex flex-col justify-center items-center"
      >
        <BaseTitle title="Academic Odyssey BATU Journeys" />
      </div>
      <p class="font-normal mt-10 text-center text-gray-dark">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
        justo ipsum. Sed accumsan quam vitae est varius
      </p>

      <button
        class="bg-transparent mt-10 hover:bg-green-dark text-green hover:text-white font-bold py-2 px-4 border-2 border-green hover:border-green-dark rounded-full duration-200"
      >
        Learn more
      </button>
    </div>
    <div class="flex flex-shrink">
      <img loading="lazy"  src="@assets/Placeholder.png" width="720" />
    </div>
  </div>
</template>

<script>
import BaseTitle from "@/components/BaseTitle.vue";

export default {
  components: {
    BaseTitle,
  },
};
</script>
