<template>
    <form class="w-full max-w-[50%] sm:max-w-[60%] md:max-w-screen-md lg:max-w-screen-lg "
        @submit.prevent="authStore.handleStudy(form)">
        <div class="relative overflow-x-auto mx-4 mt-4 w-full">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            lecturer
                        </th>
                        <th scope="col" class="px-6 py-3">
                            department
                        </th>
                        <th scope="col" class="px-6 py-3">
                            semester
                        </th>
                        <th scope="col" class="px-6 py-3">
                            academic year
                        </th>

                        <th scope="col" class="px-6 py-3">
                            credits
                        </th>
                        <th scope="col" class="px-6 py-3">
                            submit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <input type="text" v-model="form.name" class=" bg-gray-500 px-2 py-2 rounded text-white">
                        </th>
                        <td class="px-6 py-4">
                            <input type="text" v-model="form.description"
                                class=" bg-gray-500 px-2 py-2 rounded text-white">
                        </td>
                        <td class="px-6 py-4">
                            <input type="text" v-model="form.lecturer"
                                class=" bg-gray-500 px-2 py-2 rounded text-white">
                        </td>
                        <td class="px-6 py-4">
                            <select id="department" v-if="departments" v-model="form.department_id"
                                class="block appearance-none min-w-40 w-full bg-gray-400 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-gray-500">
                                <option disabled value="">Select Department</option>
                                <option v-for="dep in departments" :key="dep.id" :value="dep.id">{{ dep.name }}
                                </option>
                            </select>
                        </td>
                        <td class="px-6 py-4">
                            <input type="text" v-model="form.semester"
                                class=" bg-gray-500 px-2 py-2 rounded text-white">
                        </td>
                        <td class="px-6 py-4">
                            <!-- <input type="text" v-model="form.academic_year" disabled
                                class="bg-gray-500 px-2 py-2 rounded text-white"> -->
                                {{ form.academic_year }}
                        </td>

                        <td class="px-6 py-4">
                            <input type="text" v-model="form.credits" class=" bg-gray-500 px-2 py-2 rounded text-white">
                        </td>
                        <td class="px-6 py-4">
                            <button
                                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios'
import { useStore } from '@/store'

onMounted(() => {
    form.value.academic_year = computed(() => {
        return Math.ceil(form.value.semester / 2);
    });
})


const props = defineProps({
    id: String,
});

const apiData = ref()

const form = ref({
    name: '',
    description: '',
    lecturer: '',
    academic_year: '',
    semester: '',
    credits: '',
    user_id: '',
    id: '',
    department_id: '',
});

const authStore = useAuthStore();

const user = ref()

const fetchData = async () => {
    try {
        user.value = await inject('user');
        form.value.user_id = user.value.authUser.id;
        if (props.id) {
            const response = await axios.get('/api/StudyPlan/' + props.id);
            apiData.value = response.data
            form.value.name = apiData.value.data.name;
            form.value.description = apiData.value.data.description;
            form.value.lecturer = apiData.value.data.lecturer;
            form.value.id = apiData.value.data.id;
            // form.value.academic_year = apiData.value.data.academic_year;
            form.value.semester = apiData.value.data.semester;
            form.value.credits = apiData.value.data.credits;
            form.value.department_id = apiData.value.data.department_id;

        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {

    }
};


const departments = ref("")

const getData = async () => {
    if(!props.id){
    await useStore().getStudyPlan("/")
    apiData.value = useStore().studyPlan.data
    }
    await useStore().getDepartments("/")
    departments.value = useStore().department.departments
      // (useStore().about)
}
getData()

// onMounted(() => {
fetchData();
// });
</script>