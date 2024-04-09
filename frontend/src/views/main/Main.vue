<template>
  <div class="dark:bg-[#18191A]">
    <TheNavBar class="dark:bg-[#18191A]" />
    <router-view class=" dark:bg-[#18191A] "></router-view>
    <TheFooter />
  </div>
</template>

<script setup>
// import { useDark, useToggle } from '@vueuse/core';

// const isDark = useDark();
// const toggleDark = useToggle(isDark);
</script>