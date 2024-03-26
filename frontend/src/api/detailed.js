import get from "./apiCaller";

export default async(id) => {
    const res = await get("/api/detailed/");
    if (!res.error) {
        // (res.response.data)
        return res.response
    } else(console.log(res.response.status));
};