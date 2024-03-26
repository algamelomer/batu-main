<template>
    <form class="w-full px-8 py-4 rounded overflow-hidden shadow-lg bg-gray-700 m-auto flex flex-col gap-4"
        @submit.prevent="authStore.handlesupervisory(form)">
        <div class="relative flex gap-8">
            <select id="position" v-model="postion_handler" @change="test"
                class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                <option disabled value="">Select position</option>
                <option value="university_president">university president</option>
                <option value="vice_president">university vice president</option>
                <option value="deep_head">college deep</option>
                <option value="deep_vice">college vice deep</option>
                <option value="head">department head</option>
                <option value="vice">department vice head</option>
            </select>

            <select id="faculty" v-model="form.faculty_id" v-if="fac"
                class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                <option disabled value="">Select Faculty</option>
                <option v-for="faculty in college" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
            </select>
            <select id="department" v-model="form.department_id" v-if="dep"
                class="block appearance-none w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                <option disabled value="">Select Department</option>
                <option v-for="dep in department" :key="dep.id" :value="dep.id">{{ dep.name }}</option>
            </select>
        </div>

        <img loading="lazy"  v-if="form.imageUrl" :src="form.imageUrl" alt="Uploaded bg" class="mx-auto my-4 max-w-80 h-auto" />
        <div class=" flex justify-between px-12">
            <label for="bg">supervisor image:</label>
            <input id="bg" type="file" @change="handleImageFileChange"
                class="block w-3/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
        </div>
        <div class="px-6 py-4 flex flex-col w-full gap-4">
            <label for="departmen">supervisor name:</label>
            <input id="departmen" class="dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700"
                type="text" placeholder="supervisor name" v-model="form.name" />
            <label for="description">description:</label>
            <input id="description" class="dashInput text-black text-base resizable bg-gray-400 placeholder-gray-700"
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
});

const fac = ref(false)
const dep = ref(false)
const postion_handler = ref('')

const test = () => {
    switch (postion_handler.value) {
        case "deep_head":
            return dep.value = false, fac.value = true, form.value.position = "head"
        case "deep_vice":
            return dep.value = false, fac.value = true, form.value.position = "vice"
        case "head":
            return fac.value = false, dep.value = true, form.value.position = "head"
        case "vice":
            return fac.value = false, dep.value = true, form.value.position = "vice"
        case "university_president":
            return fac.value = false, dep.value = false, form.value.position = "university_president"
        case "vice_president":
            return dep.value = false, fac.value = false, form.value.position = "vice_president"
    };

}

const college = ref()
const department = ref()
const sup = ref()
const apiData = ref()

const form = ref({
    department_id: '',
    faculty_id: '',
    name: '',
    image: null,
    description: '',
    user_id: '',
    id: '',
    imageUrl: null,
    position: '',
});

// const filteredDepartments = ref()

// const updateFilteredDepartments = (event) => {
//     let selectedFacultyId = ''
//     if (event.target) {
//         selectedFacultyId = event.target.value;
//     }
//     else {
//         selectedFacultyId = event;
//     }
//     filteredDepartments.value = department.value.filter(dep => dep.faculty_id == selectedFacultyId);
// };



const handleImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
    form.value.image = selectedFile;
    form.value.imageUrl = URL.createObjectURL(selectedFile);
};

const authStore = useAuthStore();

const user = ref()
const fetchData = async () => {
    try {
        user.value = await inject('user');
        form.value.user_id = user.value.authUser.id;
        const supervisor = await axios.get('/api/supervisory/');
        sup.value = supervisor.data.data;
        const faculty = await axios.get('/api/faculty/');
        college.value = faculty.data.data;
        const dep = await axios.get('/api/department/');
        department.value = dep.data.departments;
        // (department.value)
        if (props.id) {
            const response = await axios.get('/api/supervisory/' + props.id);
            // (response.data.data)
            apiData.value = response.data.data
            form.value.department_id = apiData.value.department_id;
            form.value.faculty_id = apiData.value.faculty_id;
            form.value.name = apiData.value.name;
            form.value.image = apiData.value.image;
            form.value.description = apiData.value.description;
            form.value.id = apiData.value.id;
            form.value.position = apiData.value.position;

        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (form.value.image) {
            form.value.imageUrl = form.value.image
            form.value.image = form.value.image
        }
        if(form.value.position){
            postion_handler.value = form.value.position
        }
    }
};



// onMounted(() => {
fetchData();
// });
</script>