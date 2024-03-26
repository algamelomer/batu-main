<template>
    <div class="flex flex-col w-full h-full gap-10">
        <BaseHeaderImage title="Contact us" subtitle="Connect with us easily. Find our contact information and reach out for inquiries, support, or collaboration opportunities effortlessly." imgPath="https://i.ibb.co/x85jLHk/d5bd7b602e65d3befe2a6c0c42d7f7b9.png" />
        <Connect />
        <Social />
        <Form />
    </div>
</template>
<script setup>
import Form from './components/Form.vue'
import Connect from './components/Connect.vue'
import Social from './components/Social-Media.vue'

</script>