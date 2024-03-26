import { defineStore } from "pinia";
import fetchDepartments from "@/api/departments";
import faculty from "@/api/faculty";
import projects from "@/api/projects";
import facultyMember from "./api/facultyMember";
import supervisory from "./api/supervisory";
import studyPlan from "./api/studyPlan";
import Token from "./api/auth/GetToken";
import login from "./api/auth/login";
import users from "./api/auth/users";
import fetchFacultiesList from "./api/facultiesList";
import posts from "./api/posts";
import detailed from "./api/detailed";
import about from "./api/aboutUs"

export const useStore = defineStore({
    id: "counter",
    state: () => ({
        authUser: null,
        authErrors: [],
        department: {
            id: null,
            name: null,
            description: null,
            image: null,
            video: null,
            job_opportunities: [],
            faculty_id: null,
            user_id: null,
        },
        faculty: {
            id: null,
        },
        faculties: [{}, {}],
        projects: {
            id: null,
            name: null,
            description: null,
            file: null,
            image: null,
            team_name: null,
            department_id: null,
        },
        facultyMember: {},
        supervisory: {},
        studyPlan: {},
        error: {},
        users: {},
        posts: {},
        detailed: {},
        about: {}
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
    },
    actions: {
        async getDepartments(id) {
            const dep = await fetchDepartments(id);
            this.department = {...dep };
        },
        async getFaculty(id) {
            const fac = await faculty(id);
            this.faculty = {...fac };
        },
        async getFaculties() {
            const facs = await fetchFacultiesList();
            // (facs);
            this.faculties = facs;
        },
        async getprojects(id) {
            const pro = await projects(id);
            this.projects = {...pro };
        },
        async getfacultyMember(id) {
            const mem = await facultyMember(id);
            this.facultyMember = {...mem };
        },
        async getSupervisory(id) {
            const sup = await supervisory(id);
            this.supervisory = {...sup };
        },
        async getStudyPlan(id) {
            const study = await studyPlan(id);
            this.studyPlan = {...study };
        },
        async getToken() {
            await Token();
        },
        async handleLogin(data) {
            await this.getToken();
            this.error = await login(data);
        },
        async getUsers() {
            await this.getToken();
            this.users = {...(await users()) };
        },
        async getPosts(id) {
            const post = await posts(id);
            this.posts = {...post };
        },
        async getDetailed() {
            const det = await detailed();
            this.detailed = {...det };
        },
        async getAbout() {
            const ab = await about();
            this.about = {...ab };
        },
        decrement() {
            this.count--;
        },
    },
});

// export default pinia;