<template>
  <div>
    <h1>Add {{ category }}</h1>
    <component :is="getUploadFormComponent(category)" :id="id" :category="category" />
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PostsForm from './Forms/PostsForm.vue';
import DefaultUploadForm from './Forms/DefaultUploadForm.vue';
import FacultieForm from './Forms/FacultieForm.vue'
import DepartmentForm from './Forms/DepartmentForm.vue'
import FacultyMemberForm from './Forms/FacultyMemberForm.vue'
import ProjectsForm from './Forms/ProjectsForm.vue'
import UsersForm from './Forms/UsersForm.vue'
import Supervisory from './Forms/SuperVisoryForm.vue'
import About from './Forms/AboutForm.vue'
import DetailsForm from './Forms/DetailsForm.vue';
import StudyForm from './Forms/StudyForm.vue';

const category = ref('');
const id = ref('');


const route = useRoute();
onMounted(() => {
  category.value = route.params.category;
  id.value = route.params.id;
});


const getUploadFormComponent = (category) => {
  switch (category.toLowerCase()) {
    case 'news':
    case 'article':
    case 'letter':
      return PostsForm;
    case 'facultie':
      return FacultieForm
    case 'department':
      return DepartmentForm
    case 'facultymember':
      return FacultyMemberForm
    case 'projects':
      return ProjectsForm
    case 'users':
      return UsersForm
    case 'supervisory':
      return Supervisory
    case 'about':
      return About
    case 'study':
      return StudyForm
    case 'details':
      return DetailsForm
    default:
      return DefaultUploadForm;
  }
};

</script>