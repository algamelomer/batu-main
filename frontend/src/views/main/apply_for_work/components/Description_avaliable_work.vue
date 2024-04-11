<template>
    <div class=" flex flex-col p-12 items-center justify-center bg-gray-light dark:bg-darkMode-gray-light">
        <BaseTitle :title="title" :animate="false" />
        <BaseSubtitle :subtitle="subtitle" class=" -mx-4"/>
        <swiper />
    </div>
</template>
<script setup>
import BaseTitle from "@components/BaseTitle.vue"
import BaseSubtitle from "@components/BaseSubtitle.vue"
import swiper from "./swiper.vue"
import { ref } from "vue";

const title = ref("Description for our Available Work");
const subtitle = ref("Discover meaningful work with us. Explore diverse opportunities and join a dynamic team. Your next career adventure starts here!")
</script>