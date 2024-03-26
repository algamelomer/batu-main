import get from "./apiCaller";

export default async(id) => {
    const res = await get("/api/about/");
    if (!res.error) {
        return res.response.data;
    } else(res.response.status);
};