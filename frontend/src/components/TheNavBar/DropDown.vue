<template>
  <div @mouseleave="deActivateDropDown" @mouseenter="activateDropDown">
    <button type="button"
      class="py-3.5 justify-evenly h-16 w-64 text-base font-medium text-white bg-green hover:bg-green-dark duration-200 text-center"
      data-dropdown-toggle="dropdown">
      our clubs
      <font-awesome-icon icon="fa-solid fa-angle-down" class="text-white" size="xl" />
    </button>
    <transition>
      <div v-if="dropIsActive"
        class="rounded-sm absolute bg-white w-64 origin-top-left divide-y divide-gray-100 shadow">
        <ul class="py-2 text-green-dark">
          <li v-for="nav in navigations">
            <!-- <router-link
              :to="nav.path"
              class="block px-4 py-2 hover:bg-green-light hover:text-white"
              >{{ nav.name }}
            </router-link> -->
            <a :href="nav.link" class="block px-4 py-2 hover:bg-green-light hover:text-white">{{ nav.name }}</a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from "vue";
import jsonData from './clubs.json';
// const props = defineProps({
//   navigations: String,
// })

const navigations = ref(jsonData);

const dropIsActive = ref(false);

function activateDropDown() {
  dropIsActive.value = true;
}

function deActivateDropDown() {
  dropIsActive.value = false;
}
</script>
<style scoped>
.v-enter-from {
  @apply transition-all opacity-0 scale-0;
}

.v-enter-to {
  @apply opacity-100 scale-100 duration-300;
}

.v-leave-from {
  @apply transition-all scale-100 opacity-100;
}

.v-leave-to {
  @apply opacity-0 scale-0 duration-300;
}
</style>
