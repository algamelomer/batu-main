// import axios from "axios"
import get from "../apiCaller";

export default async() => {
    const res = await get("/sanctum/csrf-cookie");
    if (!res.error) {
        return res.response;
    } else(console.error(res.response.status));
};