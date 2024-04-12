<template>
        <div
            class=" flex flex-col gap-5 p-12 items-center justify-center bg-gray-light dark:bg-darkMode-gray-light overflow-hidden">
            <BaseTitle :title="props.title" :animate="false" />
            <div class=" rounded-lg w-96 h-52 overflow-hidden">
                <img src="http://127.0.0.1:8000/assets/images/635dc8af92cd9174836de9ac979103f7.png" alt="" class=" w-full h-full object-cover">
            </div>
            <BatuCounter :certificates="certificates" color=" text-gray-dark"/>
        </div>
</template>
<script setup>
import { ref } from 'vue';
import BaseTitle from "@components/BaseTitle.vue"
import BatuCounter from '../../landingPage/components/BatuCounter.vue';
const props = defineProps({
    title: String,
    certificates: Array
});

</script>