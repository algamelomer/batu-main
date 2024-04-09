<template>
  <nav class="nav text-lg">
    <ul class="flex text-sm gap-10 font-thin font-sans items-center"
      :class="{ 'text-green': isTextGreen, 'text-white': !isTextGreen }">
      <li v-for="nav in navigations">
        <router-link :to="nav.path"
          class="py-4 border-b-2 border-opacity-0 hover:border-opacity-100 duration-200 cursor-pointer"
          :class="{ 'border-green': isTextGreen, 'border-white': !isTextGreen }">{{ nav.name }}</router-link>
      </li>
      <li>
        <!-- if i want to inser a drop down eg. faculties -->
        <slot></slot>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ["isTextGreen", "navigations"],

  computed: {
    color() {
      return this.isTextGreen ? "text-green" : "text-white";
    },
  },
};
</script>
<style>
.textGreen {
  @apply text-green;
}
</style>
