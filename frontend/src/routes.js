import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "@views/main/landingPage/LandingPage.vue";
import Departments from "@views/main/departments/Departments.vue";
import AboutUs from "@views/main/aboutUs/AboutUs.vue";
import faculty from "@views/main/faculty/Faculty.vue";
import ContactUs from "@views/main/ContactUs/Contact.vue";
import Main from "@views/main/Main.vue";
import work_apply from "@views/main/apply_for_work/apply_for_work.vue";
import how_to_apply from "@views/main/How_to_apply/How_to_apply.vue";

import Book from "@views/main/flipBook/Book.vue";

export default createRouter({
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 };
    },
    history: createWebHistory(),
    routes: [{
            path: "/",
            name: "Main",
            component: Main,
            children: [
                { path: "/", component: LandingPage },
                { path: "/departments/:id", component: Departments, props: true },
                { path: "/faculty/:id", component: faculty, props: true },
                { path: "/aboutUs", component: AboutUs },
                { path: "/ContactUs", component: ContactUs },
                { path: "/book", component: Book },
                { path: "/work_apply", component: work_apply },
                { path: "/how_to_apply", component: how_to_apply },
            ],
        },
        {
            path: "/soon",
            name: "Soon",
            component: () =>
                import ("@/views/coming_soon.vue"),
        },

        {
            path: "/login",
            name: "Login",
            component: () =>
                import ("@/views/guest/Login.vue"),
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: () =>
                import ("@/views/auth/Dashboard.vue"),
            children: [{
                    path: "",
                    name: "DashboardHome",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_home.vue"),
                },
                {
                    path: "/dashboard/Faculties",
                    name: "DashboardFaculties",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_faculties.vue"),
                },
                {
                    path: "/dashboard/News",
                    name: "DashboardNews",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_news.vue"),
                },
                {
                    path: "/dashboard/Article",
                    name: "DashboardArticle",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_article.vue"),
                },
                {
                    path: "/dashboard/Letter",
                    name: "DashboardLetter",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_letter.vue"),
                },
                {
                    path: "/dashboard/Users",
                    name: "DashboardUsers",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_users.vue"),
                },
                {
                    path: "/dashboard/Departments",
                    name: "DashboardDepartments",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_departments.vue"),
                },
                {
                    path: "/dashboard/FacultyMember",
                    name: "DashboardFacultyMember",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_faculty_member.vue"),
                },
                {
                    path: "/dashboard/projects",
                    name: "DashboardProjects",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_projects.vue"),
                },
                {
                    path: "/dashboard/supervisory",
                    name: "DashboardSupervisory",
                    props: true,
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_supervisory.vue"),
                },
                {
                    path: "/dashboard/about",
                    name: "DashboardAboutUs",
                    props: true,
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_aboutUs.vue"),
                },
                {
                    path: "/dashboard/details",
                    name: "DashboardDetails",
                    props: true,
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_details.vue"),
                },
                {
                    path: "/dashboard/study",
                    name: "DashboardStudy",
                    component: () =>
                        import ("@/views/auth/dashboard/Dashboard_study_plan.vue"),
                },
                {
                    path: "/dashboard/:category/Upload",
                    name: "DashboardUpload",
                    component: () =>
                        import ("@/components/dashboard/Upload.vue"),
                },
                {
                    path: "/dashboard/:category/edit/:id",
                    name: "DashboardEdit",
                    component: () =>
                        import ("@/components/dashboard/Edit.vue"),
                },
            ],
        },
        {
            path: "/:catchAll(.*)",
            name: "NotFound",
            component: () =>
                import ("@/views/404.vue"),
        },
    ],
});