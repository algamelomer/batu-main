<template>
  <div class="bg-gray-light dark:bg-darkMode-gray-light pt-8 mt-8" v-if="props.activities">
    <div class="w-full flex flex-col justify-center items-center">
      <BaseTitle title="Our Activities" />
    </div>
    <BaseSubtitle subtitle="Engage in diverse student activities fostering growth, leadership, and community. Unleash your potential through events, clubs, and meaningful connections." />

    <CardGrid :cards="props.activities 
    // [
    //   {
    //     iconPath: '/src/assets/icons/carbon_education.svg',
    //     title: 'Student Activity',
    //     subtitle:
    //       ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius',
    //   },
    //   {
    //     iconPath: 'src/assets/icons/cil_school.svg',
    //     title: 'Student Activity',
    //     subtitle:
    //       ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius',
    //   },
    //   {
    //     iconPath: 'src/assets/icons/fluent-emoji-high-contrast_handshake.svg',
    //     title: 'Student Activity',
    //     subtitle:
    //       ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius',
    //   },
    //   {
    //     iconPath:
    //       'src/assets/icons/material-symbols_computer-outline-rounded.svg',
    //     title: 'Student Activity',
    //     subtitle:
    //       ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius',
    //   },
    //   {
    //     iconPath: 'src/assets/icons/solar_health-broken.svg',
    //     title: 'Student Activity',
    //     subtitle:
    //       ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius',
    //   },
    //   {
    //     iconPath: 'src/assets/icons/Vector.svg',
    //     title: 'Student Activity',
    //     subtitle:
    //       ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius',
    //   },
    // ]
    " />
  </div>
</template>

<script setup>
// import BaseTitle from "@components/BaseTitle.vue";
// import BaseSubtitle from "@components/BaseSubtitle.vue";
// import CardGrid from "@components/CardGrid.vue";

import CardGrid from "@components/CardGrid.vue";

const props = defineProps({
  activities: Array
})
</script>
