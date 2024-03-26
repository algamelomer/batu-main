<template>
    <form class="w-full px-8 py-4 rounded overflow-hidden shadow-lg bg-gray-700 m-auto flex flex-col gap-4"
        @submit.prevent="handleSubmit(form)">
        <div class="relative">
            <select id="faculty" v-model="form.faculty_id"
                class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                <option disabled value="">Select Faculty</option>
                <option v-for="faculty in college" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
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
            <label for="bg">bg img</label>
            <input id="bg" type="file" @change="handleBgImageFileChange"
                class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <img loading="lazy"  v-if="form.logoUrl" :src="form.logoUrl" alt="Uploaded logo" class="mx-auto my-4 w-80 h-auto" />
        <div class=" flex justify-between px-12">
            <label for="logo">logo</label>
            <input id="logo" type="file" @change="handleLogoFileChange"
                class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div class="px-6 py-4 flex flex-col w-full gap-4">
            <label for="departmen">department name</label>
            <input id="departmen" class=" dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="text" placeholder="departmen name" v-model="form.name" />
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
            <div class="flex flex-col w-full gap-4">
                <label for="job_opportunities">jobs (لاضافه وظيف اكتبها ثم اضغط Add اما اذا كنت تريد ان تحفذفها
                    اضغط علي الوظيفه المراد حذفها)</label>
                <div class="w-full flex gap-4">
                    <input id="job_opportunities"
                        class=" dashInput  w-11/12 text-black text-base  bg-gray-400 placeholder-gray-700" type="text"
                        v-model="jobAdd" placeholder="job_opportunities" />
                    <span @click="AddJob"
                        class=" cursor-pointer m-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-500 rounded">Add</span>
                </div>
                <transition-group tag="ul" name="list" class="relative p-0 grid grid-cols-3 gap-4">
                    <li class=" bg-slate-500 shadow-lg rounded-lg w-fit px-4 py-2 cursor-pointer text-center m-auto"
                        v-for="job in jobs" :key="job" @click="deleteJob(job)">
                        {{ job }}
                    </li>
                </transition-group>

            </div>
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

const jobAdd = ref()
const jobs = ref([])
const AddJob = () => {
    if (jobAdd.value.trim() !== '') {
        jobs.value.push(jobAdd.value);
        // form.value.job_opportunities = form.value.job_opportunities.join(',');
        jobAdd.value = '';
    }
}


const deleteJob = (job) => {
    const index = jobs.value.indexOf(job);
    if (index !== -1) {
        jobs.value.splice(index, 1);
    }
}


const apiData = ref()

const college = ref()

const form = ref({
    name: '',
    image: null,
    logo: null,
    video: '',
    description: '',
    job_opportunities: [],
    user_id: '',
    id: '',
    imageUrl: null,
    faculty_id: '',
    description_video: ''
});



const handleBgImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.image = selectedFile;
    form.value.imageUrl = URL.createObjectURL(selectedFile);
};

const handleLogoFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.logo = selectedFile;
    form.value.logoUrl = URL.createObjectURL(selectedFile);
};



const authStore = useAuthStore();

const user = ref()

const fetchData = async () => {
    try {
        user.value = await inject('user');
        form.value.user_id = user.value.authUser.id;
        const faculty = await axios.get('/api/faculty/');
        college.value = faculty.data.data;
        if (props.id) {
            const response = await axios.get('/api/department/' + props.id);
            // (response.data.department)
            apiData.value = response.data.department
            form.value.name = apiData.value.name;
            form.value.image = apiData.value.image;
            form.value.logo = apiData.value.logo;
            form.value.video = apiData.value.video;
            form.value.description = apiData.value.description;
            form.value.job_opportunities = apiData.value.job_opportunities;
            form.value.id = apiData.value.id;
            form.value.faculty_id = apiData.value.faculty_id;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (form.value.logo) {
            form.value.logoUrl = form.value.logo
        };
        if (form.value.image) {
            form.value.imageUrl = form.value.image
        };
        if (form.value.job_opportunities) {
            // jobAdd.value = form.value.job_opportunities.split(',')
            jobs.value = form.value.job_opportunities.split(',')
        }
    }
};

const handleSubmit = (form) => {
    form.job_opportunities = jobs.value.join(',')
    // (form.job_opportunities)
    authStore.handleDepartment(form)
}

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