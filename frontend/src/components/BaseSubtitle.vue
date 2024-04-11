<template>
  <div class="w-[80%] mx-auto" :class="styles">
    <h6
      class="mb-5 text-xl text-center mt-10 font-medium tracking-tight"
      :class="color"
    >
      {{ subtitle }}
    </h6>
  </div>
</template>

<script>
export default {
  props: {
    subtitle: String,
    color: { type: String, default: "text-gray-400" },
    styles: {type: String },
  },
};
</script>
