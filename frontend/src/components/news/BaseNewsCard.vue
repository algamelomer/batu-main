<template>
  <div v-motion-pop>
    <img loading="lazy"  :src="imgPath" class="w-52 h-full object-cover object-left" />
  </div>
  <div
    v-motion-pop
    @click="emitOnclick"
    class="group w-full cursor-pointer hover:bg-green-light duration-200"
    :class="isActive ? 'bg-green-light' : 'bg-gray-light'"
  >
    <div class="pl-3 pt-3 w-[75%]">
      <h1 class="text-2xl font-black text-green-dark">
        {{ title }}
      </h1>
      <p
        class="text-xs pt-2 group-hover:text-white duration-200"
        :class="isActive ? 'text-white' : 'text-gray-dark'"
      >
        {{ description }}
      </p>
    </div>
    <div
      class="flex justify-center items-center w-10 h-10 mx-auto absolute top-[40%] right-4 bg-green-dark rounded-full"
    >
      <font-awesome-icon
        icon="fa-solid fa-angle-right"
        class="text-white"
        size="xl"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    id: String,
    isActive: Boolean,
    title: String,
    description: String,
    imgPath: String,
  },

  setup(props, { emit }) {
    function emitOnclick() {
      emit("click", props.id);
    }
    return { emitOnclick };
  },
});
</script>
