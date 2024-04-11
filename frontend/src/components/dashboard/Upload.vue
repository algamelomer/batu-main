<template>
  <div>
    <h1>Add {{ category }}</h1>
    <component :is="getUploadFormComponent(category)" :category="category" />
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DefaultUploadForm from './Forms/DefaultUploadForm.vue';
import PostsForm from './Forms/PostsForm.vue'
import FacultieForm from './Forms/FacultieForm.vue'
import DepartmentForm from './Forms/DepartmentForm.vue'
import FacultyMemberForm from './Forms/FacultyMemberForm.vue'
import ProjectsForm from './Forms/ProjectsForm.vue'
import UsersForm from './Forms/UsersForm.vue'
import Supervisory from './Forms/SuperVisoryForm.vue'
import About from './Forms/AboutForm.vue';
import DetailsForm from './Forms/DetailsForm.vue';
import StudyForm from './Forms/StudyForm.vue';

const category = ref('');

const route = useRoute();
onMounted(() => {
  category.value = route.params.category;
});

const getUploadFormComponent = (category) => {
  switch (category.toLowerCase()) {
    case 'news':
    case 'letter':
    case 'article':
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
    case 'details':
      return DetailsForm
    case 'study':
      return StudyForm
    default:
      return DefaultUploadForm;
  }
};
</script>
  