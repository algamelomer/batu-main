import get from "./apiCaller";

export default async(id) => {
    const res = await get("/api/supervisory/" + id);
    if (!res.error) {
        // (res.response.data);
        return res.response;
    } else(console.error(res.response.status));
};