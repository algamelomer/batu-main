<template>
    <BaseHeaderImage :title="Header_Title" :subtitle="Header_Subtitle" :imgPath="imgPath" />
    <div class=" flex flex-col px-0 md:px-10 gap-6">
        <BaseImgSection :title="Journeys_Title" :description="Journeys_Subtitle" :imgPath="imgPath" class=" m-0" />
        <News :news="news" title="Dr.Osama’s Events"
            subtitle="Discover Dr. Osama El-Nahass's latest events. Stay updated on recent lectures, workshops, and seminars hosted by our esteemed faculty member." />
        <certificate title="Dr.Osama’s Certificates" :certificates="certificates" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseImgSection from "@/components/BaseImgSection.vue";
import News from "@/views/main/landingPage/components/news.vue";
import certificate from "./components/Certificates.vue"

const imgPath = ref("http://127.0.0.1:8000/assets/images/8a639cf1f850a54432a640d439429594.png");
const Header_Title = ref("Dr.Osama El-Nahass");
const Header_Subtitle = ref("Meet Dr. Osama El-Nahass. Discover his expertise, research, and contributions to our college community on his dedicated page.");
const Journeys_Title = ref("Dr.Osama’s Word");
const Journeys_Subtitle = ref("College History Section Description College History Section Description College History Section Description College History Section Description College History Section Description");

const news = ref([
    {
        id: 1,
        title: 'Dr.Osama hosts a Robocup event.',
        description: 'Description for the news Description for the news Description for the news.',
        file: 'http://127.0.0.1:8000/assets/images/38f665be4c5a87f4dae873d8e32f3bf3.png',
        file_type: 'image'
    },
    {
        id: 2,
        title: 'Dr.Osama hosts an IT Club Iftar.',
        description: 'Description for the news Description for the news Description for the news.',
        file: 'http://127.0.0.1:8000/assets/images/f87742b96f56a91a08e0d9281cb5481f.png',
        file_type: 'image'
    },
    {
        id: 3,
        title: 'Dr.Osama Supervise Projects.',
        description: 'Description for the news Description for the news Description for the news.',
        file: 'http://127.0.0.1:8000/assets/images/ad1669497189eae89e2b01a506c60f94.png',
        file_type: 'image'
    },
    {
        id: 4,
        title: 'Dr.Osama Visits 57357 Hospital.',
        description: 'Description for the news Description for the news Description for the news.',
        file: 'http://127.0.0.1:8000/assets/images/645b7af18754104f6a8abf36f6b47f7e.png',
        file_type: 'image'
    },
])

const certificates = ref([
    {
        id: 1,
        title: 'Certificate no.1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius',
        image: 'http://127.0.0.1:8000/assets/images/Vector.png',
    },
    {
        id: 2,
        title: 'Certificate no.2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius',
        image: 'http://127.0.0.1:8000/assets/images/Vector.png',
    },
    {
        id: 3,
        title: 'Certificate no.3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius',
        image: 'http://127.0.0.1:8000/assets/images/Vector.png',
    },
])

</script>