<template>
    <transition name="fade">
        <Alert v-if="alert" :alert-message="alert" class=" z-40 !fixed top-6 right-1/2 translate-x-1/2"
            color=" bg-green-500"></Alert>
    </transition>
    <div class=" bg-gray-light dark:bg-darkMode-gray-light p-12 w-full w-full m-auto rounded-md flex flex-col items-center text-center">
        <h1 class=" font-mulish font-bold text-4xl text-green-dark">{{ title }}</h1>
        <hr width="50px" class="border-black border-[1.5px] mt-5" />
            <form class=" grid grid-cols-1 w-full gap-4 min-[850px]:grid-cols-2" @submit.prevent="submitForm(form)">
                <div class="relative h-fit w-full sm:w-fit m-auto">
                    <select v-model="formData.contact_reason"
                        class=" cursor-pointer w-full m-auto sm:w-[335px] h-14 p-2 pr-10 border border-green-dark rounded-[55px] shadow-sm focus:outline-none focus:border-green-dark text-center text-white bg-green hover:bg-green-dark transition duration-300 appearance-none">
                        <option value="" disabled selected>Choose Position</option>
                        <!-- <option value="اقتراحات">اقتراحات</option>
                        <option value="شكاوي">شكاوي</option>
                        <option value="استفسار">استفسار</option>
                        <option value="اخري">اخري</option> -->
                    </select>
                    <div class="absolute inset-y-0 top-1 right-1 min-[360px]:right-4 flex items-center pr-2 pointer-events-none text-white">
                        <font-awesome-icon :icon="['fas', 'angle-down']" />
                    </div>
                </div>

                <input placeholder="Enter your Name" v-model="formData.name" type="text"
                    class=" w-full m-auto sm:w-[335px] h-14 rounded-[55px] border-[1.4px] active:border-green-dark border-green-dark text-green-dark text-center" />
                <input placeholder="Your Email" v-model="formData.email" type="text"
                    class=" w-full m-auto sm:w-[335px] h-14 rounded-[55px] border-[1.4px] active:border-green-dark border-green-dark text-green-dark text-center" />
                <input placeholder="Your Number" v-model="formData.number" type="text"
                    class=" w-full m-auto sm:w-[335px] h-14 rounded-[55px] border-[1.4px] active:border-green-dark border-green-dark text-green-dark text-center" />

                <button class="m-auto relative w-full sm:w-[335px] h-14 border border-green-dark rounded-[55px] shadow-sm focus:outline-none focus:border-green text-center text-white bg-green transition duration-300 hover:bg-green-dark">Upload Your CV</button>



                <button :disabled="loading" type="submit"
                    class=" m-auto relative w-full sm:w-[335px] h-14 border border-green-dark rounded-[55px] shadow-sm focus:outline-none focus:border-green text-center text-white bg-green transition duration-300 hover:bg-green-dark">
                    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
                        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V2.5a.5.5 0 00-1 0V4a.5.5 0 00.5.5H12a.5.5 0 000-1h-.5A8 8 0 004 12h.5a.5.5 0 000-1H4zm13.034 5.66a8 8 0 01-1.41-1.41l.707-.707a.5.5 0 00-.353-.854h-1.414a.5.5 0 000 1h.663l-.375.375a.5.5 0 10.707.707l.375-.375v.663a.5.5 0 001 0v-1.414a.5.5 0 00-.854-.354l-.707.707zm-10.67-10.68a8 8 0 011.41 1.41l-.707.707a.5.5 0 00.353.854h1.414a.5.5 0 000-1h-.663l.375-.375a.5.5 0 10-.707-.707l-.375.375v-.663a.5.5 0 00-1 0v1.414a.5.5 0 00.854.354l.707-.707z">
                            </path>
                        </svg>
                    </span> <span v-else>Submit</span>
                </button>
            </form>
        
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import Alert from '@/components/Alert.vue'

const title = "Submit the Form"
const loading = ref(false);
const formData = ref({
    name: "",
    email: "",
    number: "",
    contact_reason: "",
    message: ""
});


const alert = ref('')

const submitForm = () => {
    loading.value = true;
    const timestamp = new Date().toISOString();

    const formDatab = new FormData();
    formDatab.append("Name", formData.value.name);
    formDatab.append("Email", formData.value.email);
    formDatab.append("Message", formData.value.message);
    formDatab.append("Contact_reason", formData.value.contact_reason);
    formDatab.append("Number", formData.value.number);
    formDatab.append("Timestamp", timestamp);

    fetch(
        "https://script.google.com/macros/s/AKfycbxakDRwQcY02NazogAYBdISp8KUmPcPWr8zO5lRs6J0lqgjP9zPNE11LTF1bH959mv2/exec",
        {
            method: "POST",
            body: formDatab
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.text();
        })
        .then((data) => {
            formData.value.name = "";
            formData.value.email = "";
            formData.value.message = "";
            formData.value.contact_reason = "";
            formData.value.number = "";
            loading.value = false;
            alert.value = data;
            setTimeout(function () {
                alert.value = "";
            }, 4000);
        })
        .catch((error) => {
            console.error(error);
        });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23353E48" viewBox="0 0 20 20"><path d="M14.707 7.293a1 1 0 0 0-1.414 0L10 10.586 6.707 7.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"/></svg>'); */
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    padding-right: 1.5rem;
}
</style>
  