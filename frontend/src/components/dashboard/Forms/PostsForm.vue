<template>
    <form class="w-full px-8 py-4 rounded overflow-hidden shadow-lg bg-gray-700 m-auto flex flex-col gap-4"
        @submit.prevent="authStore.handlePosts(form)">
        <img loading="lazy"  v-if="form.fileUrl" :src="form.fileUrl" alt="Uploaded Photo" class="mx-auto my-4 w-80 h-auto" />
        <label for="bg">{{ form.type }} image</label>
        <input id="bg" type="file" @change="handleFileChange"
            class=" block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        <div class="px-6 py-4 flex flex-col w-full gap-4">
            <label for="title">title</label>
            <input id="title" class=" dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="title" v-model="form.title" />
            <label for="description">description</label>
            <input id="description" class=" dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="text" placeholder="description" v-model="form.description" />
        </div>
        <button
            class="m-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-500 rounded">Upload</button>

    </form>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios'


const props = defineProps({
    id: String,
    category: String
});

const apiData = ref()

const form = ref({
    title: '',
    description: '',
    file: null,
    user_id: '',
    id: '',
    fileUrl: null,
    type: props.category
});




const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.file = selectedFile;
    form.value.fileUrl = URL.createObjectURL(selectedFile);
};

const authStore = useAuthStore();

const user = ref()

const fetchData = async () => {
    try {
        user.value = await inject('user');
        form.value.user_id = user.value.authUser.id;
        if (props.id) {
            const response = await axios.get('/api/posts/' + props.id);
            apiData.value = response.data
            form.value.title = apiData.value.title;
            form.value.file = apiData.value.file;
            form.value.description = apiData.value.description;
            form.value.id = apiData.value.id;
            form.value.type = props.category;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (form.value.file) {
            form.value.fileUrl = form.value.file
        }
    }
};



// onMounted(() => {
    fetchData();
// });
</script>