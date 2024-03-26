<template>

<DesktopNavBar v-if="isDesktop"/>
<MobileNavBar v-else/>
</template>

<script setup>
import DesktopNavBar from './DesktopNavBar.vue';
import MobileNavBar from './MobileNavBar.vue';  
import { ref, computed, onMounted, onUnmounted } from 'vue';

const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
  // (screenWidth.value);
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const isDesktop = computed(() => screenWidth.value > 840);



</script>
