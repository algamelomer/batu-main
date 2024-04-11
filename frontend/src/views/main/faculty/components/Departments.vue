<template>
    <Swiper :items="props.Departments" title="Our Main Majors" :first="2" :second="2" :third="1" Card="departments" />
</template>
  
<script setup>
// components
import Swiper from '@/components/faculty/swiper.vue';

const props = defineProps({ Departments: Array })

</script>
  