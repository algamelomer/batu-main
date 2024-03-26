import axios from "axios";
import router from "@/routes";

export default async(data) => {
    if (!data.email) {
        return "email is required";
    } else if (!data.password) {
        return "Password is required";
    } else if (data.password.length < 8) {
        return "Password must be at least 8 characters long";
    } else {
        try {
            await axios.post("/api/login", {
                email: data.email,
                password: data.password,
            });
            router.push("/dashboard");
        } catch (error) {
            if (error.response.status === 422) {
                return "invalid email or password";
            }
        }
    }
};