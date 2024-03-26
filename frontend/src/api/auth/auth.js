// import { defineStore } from "pinia";
// import axios from "axios";
// import router from "../router/index";

// export const useAuthStore = defineStore("auth", {
//     state: () => ({
//         authUser: null,
//         authErrors: [],
//     }),
//     getters: {
//         user: (state) => state.authUser,
//         errors: (state) => state.authErrors,
//     },
//     actions: {
//         async getToken() {
//             await axios.get("/sanctum/csrf-cookie");
//         },

//         async getUser() {
//             try {
//                 await this.getToken();
//                 const data = await axios.get("/api/user");
//                 this.authUser = data.data;
//             } catch (error) {
//                 if (error.response.status == 401) {
//                     this.authUser = false;
//                     this.authErrors = Object.values("You need to login first!").flat();
//                 } else {
//                     console.error(error.response.status);
//                 }
//             }
//         },

//         async handleLogin(data) {
//             this.authErrors = [];
//             await this.getToken();
//             if (!data.email) {
//                 this.authErrors = Object.values("email is required").flat();
//             } else if (!data.password) {
//                 this.authErrors = Object.values("Password is required").flat();
//             } else if (data.password.length < 8) {
//                 this.authErrors = Object.values("Password must be at least 8 characters long").flat();
//             } else {
//                 try {
//                     await axios.post("/api/login", {
//                         email: data.email,
//                         password: data.password,
//                     });

//                     this.router.push("/dashboard");
//                 } catch (error) {
//                     if (error.response.status === 422) {
//                         this.authErrors = Object.values("invalid email or password").flat();
//                     }
//                 }
//             }
//         },

//         async handleLogout() {
//             try {
//                 await axios.post("/api/logout");
//                 document.cookie.split(";").forEach((c) => {
//                     document.cookie = c
//                         .replace(/^ +/, "")
//                         .replace(
//                             /=.*/,
//                             "=;expires=" + new Date().toUTCString() + ";path=/"
//                         );
//                 });
//                 this.authUser = null;
//                 this.router.push("/login");
//             } catch (error) {
//                 console.error("Logout failed:", error);
//             }
//         },

//         async handleRegister(data) {
//             this.authErrors = [];

//             await this.getToken();

//             try {
//                 await axios.post("/api/register", {
//                     name: data.name,
//                     email: data.email,
//                     password: data.password,
//                     password_confirmation: data.password_confirmation,
//                 });

//                 this.router.push("/dashboard");
//             } catch (error) {
//                 if (error.response.status === 422) {
//                     this.authErrors = error.response.data.errors;
//                 }
//             }
//         },

//         async handlePosts(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 if (!data.id) {
//                     data.id = "";
//                 }
//                 const formData = new FormData();
//                 formData.append("title", data.title);
//                 formData.append("description", data.description);
//                 formData.append("file", data.file);
//                 formData.append("type", data.type);
//                 formData.append("user_id", data.user_id);
//                 const response = await axios.post("/api/posts/" + data.id, formData, {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });

//                 if (response.status === 201) {
//                     alert("Success");
//                     router.go(-1);
//                 } else if (response.status === 200) {
//                     alert("Success");
//                     router.go(-1);
//                 } else {
//                     alert("Error: Unexpected status code");
//                     (data);
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },

//         async handlePostsDelete(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 await axios.delete("/api/posts/" + data);

//                 alert("deleted successfully");
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },
//         async handleFacultie(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 if (!data.id) {
//                     data.id = "";
//                 }
//                 const formData = new FormData();
//                 formData.append("name", data.name);
//                 formData.append("image", data.image);
//                 formData.append("logo", data.logo);
//                 formData.append("video", data.video);
//                 formData.append("description", data.description);
//                 formData.append("vision", data.vision);
//                 formData.append("mission", data.mission);
//                 formData.append("user_id", data.user_id);
//                 const response = await axios.post("/api/faculty/" + data.id, formData, {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });

//                 if (response.status === 201) {
//                     alert("Success");
//                     router.go(-1);
//                 } else if (response.status === 200) {
//                     alert("Success");
//                     router.go(-1);
//                 } else {
//                     alert("Error: Unexpected status code");
//                     (data);
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },

//         async handleFacultieDelete(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 await axios.delete("/api/faculty/" + data);

//                 alert("deleted successfully");
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },

//         async handleDepartment(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 if (!data.id) {
//                     data.id = "";
//                 }
//                 (data);
//                 const formData = new FormData();
//                 formData.append("name", data.name);
//                 formData.append("image", data.image);
//                 formData.append("job_opportunities", data.job_opportunities);
//                 formData.append("video", data.video);
//                 formData.append("description", data.description);
//                 formData.append("faculty_id", data.faculty_id);
//                 formData.append("user_id", data.user_id);
//                 const response = await axios.post(
//                     "/api/department/" + data.id,
//                     formData, {
//                         headers: {
//                             "Content-Type": "multipart/form-data",
//                         },
//                     }
//                 );

//                 if (response.status === 201) {
//                     alert("Success");
//                     router.go(-1);
//                 } else if (response.status === 200) {
//                     alert("Success");
//                     router.go(-1);
//                 } else {
//                     alert("Error: Unexpected status code");
//                     (data);
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },

//         async handleDepartmentDelete(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 await axios.delete("/api/department/" + data);

//                 alert("deleted successfully");
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },

//         async handleProject(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 if (!data.id) {
//                     data.id = "";
//                 }
//                 (data);
//                 const formData = new FormData();
//                 formData.append("name", data.name);
//                 formData.append("image", data.image);
//                 formData.append("file", data.file);
//                 formData.append("team_name", data.team_name);
//                 formData.append("description", data.description);
//                 formData.append("department_id", data.department_id);
//                 formData.append("user_id", data.user_id);
//                 const response = await axios.post(
//                     "/api/projects/" + data.id,
//                     formData, {
//                         headers: {
//                             "Content-Type": "multipart/form-data",
//                         },
//                     }
//                 );

//                 if (response.status === 201) {
//                     alert("Success");
//                     router.go(-1);
//                 } else if (response.status === 200) {
//                     alert("Success");
//                     router.go(-1);
//                 } else {
//                     alert("Error: Unexpected status code");
//                     (data);
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },

//         async handleprojectsDelete(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 await axios.delete("/api/projects/" + data);

//                 alert("deleted successfully");
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },

//         async handleFacultyMember(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 if (!data.id) {
//                     data.id = "";
//                 }
//                 const formData = new FormData();
//                 formData.append("department_id", data.department_id);
//                 formData.append("faculty_id", data.faculty_id);
//                 formData.append("name", data.name);
//                 formData.append("image", data.image);
//                 formData.append("title", data.title);
//                 formData.append("sub_title", data.sub_title);
//                 formData.append("career", data.career);
//                 formData.append("experience", data.experience);
//                 formData.append("scientific_interests", data.scientific_interests);
//                 formData.append("user_id", data.user_id);
//                 formData.append("id", data.id);
//                 formData.append("imageUrl", data.imageUrl);
//                 const response = await axios.post(
//                     "/api/member/" + data.id,
//                     formData, {
//                         headers: {
//                             "Content-Type": "multipart/form-data",
//                         },
//                     }
//                 );

//                 if (response.status === 201) {
//                     alert("Success");
//                     router.go(-1);
//                 } else if (response.status === 200) {
//                     alert("Success");
//                     router.go(-1);
//                 } else {
//                     alert("Error: Unexpected status code");
//                     (data);
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },

//         async handleFacultieMemberDelete(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 await axios.delete("/api/member/" + data);

//                 alert("deleted successfully");
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },


//         async handleUsers(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 if (!data.id) {
//                     data.id = "";
//                 }
//                 (data);
//                 const formData = new FormData();
//                 formData.append("name", data.name);
//                 formData.append("role", data.role);
//                 formData.append("user_id", data.user_id);
//                 formData.append("id", data.id);
//                 formData.append("password", data.password);
//                 formData.append("email", data.email);
//                 const response = await axios.post(
//                     "/api/users/" + data.id,
//                     formData, {
//                         headers: {
//                             "Content-Type": "multipart/form-data",
//                         },
//                     }
//                 );

//                 if (response.status === 201) {
//                     alert("Success");
//                     router.go(-1);
//                 } else if (response.status === 200) {
//                     alert("Success");
//                     router.go(-1);
//                 } else {
//                     alert("Error: Unexpected status code");
//                     (data);
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },

//         async handleUsersDelete(data) {
//             this.authErrors = [];
//             try {
//                 await this.getToken();
//                 await axios.delete("/api/users/" + data);

//                 alert("deleted successfully");
//             } catch (error) {
//                 if (error.response) {
//                     if (error.response.status === 422) {
//                         this.authErrors = error.response.data.errors;
//                         alert("Error: Validation failed");
//                     } else {
//                         alert("Error: Server error");
//                     }
//                 } else {
//                     alert("Error: Network error");
//                 }
//             }
//         },


//         async handleForgotPassword(email) {
//             this.authErrors = [];

//             try {
//                 await axios.post("/api/forgot-password", {
//                     email: email,
//                 });
//             } catch (error) {
//                 if (error.response.status === 422) {
//                     this.authErrors = error.response.data.errors;
//                 }
//             }
//         },

//         async handleResetPassword(resetData) {
//             this.authErrors = [];

//             try {
//                 await axios.post("/api/reset-password", resetData);
//                 this.router.push("/");
//             } catch (error) {
//                 if (error.response.status === 422) {
//                     this.authErrors = error.response.data.errors;
//                 }
//             }
//         },
//     },
// });