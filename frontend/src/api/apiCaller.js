import axios from "axios";
export default async(endpoint) => {
    // (endpoint)

    const res = {
        error: false,
        response: null,
    };
    try {
        const response = await axios.get(endpoint);
        res.response = response.data
        return res;
    } catch (error) {
        res.error = true;
        if (error.response) {
            res.response = error.response
        }
        return res;
    }
}