import get from "./apiCaller"

export default async(id) => {
    const res = await get('/api/department/' + id)
    if (!res.error) {
        // (res.response.department)
        return res.response
    } else(
        console.log(res.response.status)
    )

}