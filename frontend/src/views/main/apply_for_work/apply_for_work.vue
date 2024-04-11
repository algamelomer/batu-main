<template>
    <div class="flex flex-col w-full h-full gap-10 ">
        <BaseHeaderImage title="Apply For Work"
            subtitle="Explore exciting career opportunities at our college. Join us in fostering education excellence. Apply now for a rewarding future!"
            imgPath="http://127.0.0.1:8000/assets/images/a76211946a6ff0f0efc1ffc78676db70.jpeg" />

        <div class=" px-0 md:px-10 flex flex-col w-full h-full gap-10">
            <Form />
            <Description_avaliable_work />
        </div>
    </div>
</template>
<script setup>
import Form from './components/Form.vue'
import Description_avaliable_work from './components/Description_avaliable_work.vue';
</script>