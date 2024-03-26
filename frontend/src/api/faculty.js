import get from "./apiCaller";

export default async(id) => {
    const res = await get("/api/faculty/" + id);
    if (!res.error) {
        return res.response
    } else(console.error(res.response.status));
};