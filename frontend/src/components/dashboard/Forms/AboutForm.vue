<template>
    <form class="w-full px-8 py-4 rounded overflow-hidden shadow-lg bg-gray-700 m-auto flex flex-col gap-4"
        @submit.prevent="authStore.handleAbout_Us(form)">
        <div class="relative">
            <select id="faculty" v-model="form.type"
                class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                <option disabled value="">Select Content</option>
                <option v-for="items in aboutList" :key="items.id" :value="items.name">{{ items.name }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M8.293 11.293a1 1 0 011.414 0L12 13.586V7a1 1 0 112 0v6.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>

        <img loading="lazy"  v-if="form.imageUrl" :src="form.imageUrl" alt="Uploaded bg" class="mx-auto my-4 w-80 h-auto" />
        <div class=" flex justify-between px-12">
            <label for="bg">img</label>
            <input id="bg" type="file" @change="handleBgImageFileChange"
                class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div class="px-6 py-4 flex flex-col w-full gap-4">
            <label for="title">title</label>
            <input id="title" class=" dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="text" placeholder="title" v-model="form.title" />
            <label for="description">description</label>
            <textarea id="description" class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="text" placeholder="description" v-model="form.description"></textarea>
            <label for="youtubevideourl">youtube video url</label>
            <input id="youtubevideourl" class=" dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="url" placeholder="youtube video url" @input="VideoInput" />
            <label for="description_video">description_video</label>
            <textarea id="description_video"
                class="dashTextArea text-black text-base resizable bg-gray-400 placeholder-gray-700" type="text"
                placeholder="description_video" v-model="form.description_video"></textarea>
        </div>
        <button
            class="m-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-500 rounded">Upload</button>

    </form>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios'
import embedYoutubeVideo from '@/global/videoEmbed'


const props = defineProps({
    id: String,
});

const VideoInput = (event) => {
    form.value.video = embedYoutubeVideo(event.target.value);
}


const apiData = ref()

const form = ref({
    title: '',
    image: null,
    video: '',
    description: '',
    type: '',
    user_id: '',
    id: '',
    imageUrl: null,
    description_video: ''
});



const handleBgImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.image = selectedFile;
    form.value.imageUrl = URL.createObjectURL(selectedFile);
};


const aboutList = ref([
    { id: 1, name: 'mission' },
    { id: 2, name: 'history' },
    { id: 3, name: 'vision' },
    { id: 4, name: 'governing_council' },
    { id: 5, name: 'contracts' },
    { id: 6, name: 'policies' },
    { id: 7, name: 'header' },
    { id: 8, name: 'UniversityInfo' },
    // { id: 9, name: 'others' },
])

const authStore = useAuthStore();

const user = ref()

const fetchData = async () => {
    try {
        user.value = await inject('user');
        form.value.user_id = user.value.authUser.id;
        // const faculty = await axios.get('/api/faculty/');
        // college.value = faculty.data.data;
        if (props.id) {
            const response = await axios.get('/api/about/' + props.id);
            // (response.data.data)
            apiData.value = response.data.data
            form.value.title = apiData.value.title;
            form.value.type = apiData.value.type;
            form.value.image = apiData.value.image;
            form.value.video = apiData.value.video;
            form.value.description_video = apiData.value.description_video;
            form.value.description = apiData.value.description;
            form.value.id = apiData.value.id;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (form.value.image) {
            form.value.imageUrl = form.value.image
        };
    }
};



// onMounted(() => {
fetchData();
// });
</script>

<style>
.list-enter-from {
    opacity: 0;
    transform: scale(0.6);
}

.list-enter-to {
    opacity: 1;
    transform: scale(1);
}

.list-enter-active {
    transition: all 0.4s ease;
}

.list-leave-from {
    opacity: 1;
    transform: scale(1);
}

.list-leave-to {
    opacity: 0;
    transform: scale(0.6);
}

.list-leave-active {
    transform: all 0.4s ease;
}
</style>