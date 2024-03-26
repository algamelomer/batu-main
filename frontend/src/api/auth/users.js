import get from "../apiCaller";

export default async() => {
    try {
        const data = await get("/api/user");
        return data.data;
    } catch (error) {
        if (error.response.status == 401) {
            // this.authUser = false;
            return "You need to login first!"
        } else {
            console.error(error.response.status);
        }
    }
}