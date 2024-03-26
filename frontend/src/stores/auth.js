import { defineStore } from "pinia";
import axios from "axios";
import router from "../routes";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: null,
        authErrors: [],
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
    },
    actions: {
        async getToken() {
            await axios.get("/sanctum/csrf-cookie");
        },

        async getUser() {
            try {
                await this.getToken();
                const data = await axios.get("/api/user");
                this.authUser = data.data;
            } catch (error) {
                if (error.response.status == 401) {
                    this.authUser = false;
                    this.authErrors = Object.values("You need to login first!").flat();
                } else {
                    console.error(error.response.status);
                }
            }
        },

        async handleLogin(data) {
            this.authErrors = [];
            await this.getToken();
            if (!data.email) {
                this.authErrors = Object.values("email is required").flat();
            } else if (!data.password) {
                this.authErrors = Object.values("Password is required").flat();
            } else if (data.password.length < 8) {
                this.authErrors = Object.values(
                    "Password must be at least 8 characters long"
                ).flat();
            } else {
                try {
                    await this.getToken();
                    await axios.post("/api/login", {
                        email: data.email,
                        password: data.password,
                    });

                    this.router.push("/dashboard");
                } catch (error) {
                    if (error.response.status === 422) {
                        this.authErrors = Object.values("invalid email or password").flat();
                    }
                }
            }
        },

        async handleLogout() {
            try {
                await axios.post("/api/logout");
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(
                            /=.*/,
                            "=;expires=" + new Date().toUTCString() + ";path=/"
                        );
                });
                this.authUser = null;
                this.router.push("/login");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        },

        async handleRegister(data) {
            this.authErrors = [];

            await this.getToken();

            try {
                await axios.post("/api/register", {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                });

                this.router.push("/dashboard");
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },

        async handlePosts(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                if (!data.id) {
                    data.id = "";
                }
                const response = await axios.post("/api/posts/" + data.id, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    alert("Success");
                    router.go(-1);
                } else if (response.status === 200) {
                    alert("Success");
                    router.go(-1);
                } else {
                    alert("Error: Unexpected status code");
                    // (data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handlePostsDelete(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                await axios.delete("/api/posts/" + data);

                alert("deleted successfully");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },
        async handleFacultie(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                if (!data.id) {
                    data.id = "";
                }
                // (data);
                const response = await axios.post("/api/faculty/" + data.id, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    alert("Success");
                    router.go(-1);
                } else if (response.status === 200) {
                    alert("Success");
                    router.go(-1);
                } else {
                    alert("Error: Unexpected status code");
                    // (data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleFacultieDelete(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                await axios.delete("/api/faculty/" + data);

                alert("deleted successfully");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleDepartment(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                if (!data.id) {
                    data.id = "";
                }
                // (data);
                const response = await axios.post("/api/department/" + data.id, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    alert("Success");
                    router.go(-1);
                } else if (response.status === 200) {
                    alert("Success");
                    router.go(-1);
                } else {
                    alert("Error: Unexpected status code");
                    // (data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleDepartmentDelete(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                await axios.delete("/api/department/" + data);

                alert("deleted successfully");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleProject(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                if (!data.id) {
                    data.id = "";
                }
                // (data);
                const response = await axios.post("/api/projects/" + data.id, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    alert("Success");
                    router.go(-1);
                } else if (response.status === 200) {
                    alert("Success");
                    router.go(-1);
                } else {
                    alert("Error: Unexpected status code");
                    // (data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleprojectsDelete(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                await axios.delete("/api/projects/" + data);

                alert("deleted successfully");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleFacultyMember(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                if (!data.id) {
                    data.id = "";
                }
                // (data);
                const response = await axios.post("/api/member/" + data.id, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    alert("Success");
                    router.go(-1);
                } else if (response.status === 200) {
                    alert("Success");
                    router.go(-1);
                } else {
                    alert("Error: Unexpected status code");
                    // (data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleFacultieMemberDelete(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                await axios.delete("/api/member/" + data);

                alert("deleted successfully");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handlesupervisory(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                if (!data.id) {
                    data.id = "";
                }
                // (data);
                const response = await axios.post("/api/supervisory/" + data.id, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    alert("Success");
                    router.go(-1);
                } else if (response.status === 200) {
                    alert("Success");
                    router.go(-1);
                } else {
                    alert("Error: Unexpected status code");
                    // (data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handlesupervisoryDelete(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                await axios.delete("/api/supervisory/" + data);

                alert("deleted successfully");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleUsers(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                if (!data.id) {
                    data.id = "";
                }
                // (data);
                const response = await axios.post("/api/users/" + data.id, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    alert("Success");
                    router.go(-1);
                } else if (response.status === 200) {
                    alert("Success");
                    router.go(-1);
                } else {
                    alert("Error: Unexpected status code");
                    // (data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleUsersDelete(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                await axios.delete("/api/users/" + data);

                alert("deleted successfully");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleAbout_Us(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                if (!data.id) {
                    data.id = "";
                }
                // (data);
                const response = await axios.post("/api/about/" + data.id, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    alert("Success");
                    router.go(-1);
                } else if (response.status === 200) {
                    alert("Success");
                    router.go(-1);
                } else {
                    alert("Error: Unexpected status code");
                    // (data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleAbout_UsDelete(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                await axios.delete("/api/about/" + data);

                alert("deleted successfully");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleDetails(data) {
            this.authErrors = [];
            try {
                await this.getToken();

                const response = await axios.post("/api/detailed/", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 201) {
                    alert("Success");
                    router.go(-1);
                } else if (response.status === 200) {
                    alert("Success");
                    router.go(-1);
                } else {
                    alert("Error: Unexpected status code");
                    // (data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },

        async handleDetails_Delete(data) {
            this.authErrors = [];
            try {
                await this.getToken();
                await axios.delete("/api/detailed/" + data);

                alert("deleted successfully");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.authErrors = error.response.data.errors;
                        alert("Error: Validation failed");
                    } else {
                        alert("Error: Server error");
                    }
                } else {
                    alert("Error: Network error");
                }
            }
        },
        async handleForgotPassword(email) {
            this.authErrors = [];

            try {
                await axios.post("/api/forgot-password", {
                    email: email,
                });
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },

        async handleResetPassword(resetData) {
            this.authErrors = [];

            try {
                await axios.post("/api/reset-password", resetData);
                this.router.push("/");
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
    },
});