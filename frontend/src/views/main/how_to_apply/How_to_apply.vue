<template>
    <div class="flex flex-col w-full h-full gap-10 ">
        <BaseHeaderImage title="How To Apply" :subtitle="subtitle"
            imgPath="http://127.0.0.1:8000/assets/images/19dc5bc94a66a7c360caca084ced301d.png" />
        <div class=" px-0 md:px-10 flex flex-col w-full h-full gap-10">
            <card />
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import card from "./components/card.vue"
const subtitle = ref("Begin your journey with us. Discover step-by-step instructions and requirements on this page to seamlessly apply to Borg Al-Arab Technological University.")
</script>