import get from './apiCaller';

export default async() => {
    try {
        const response = await get('/api/faculty/');

        const facultiesList = response.response.data;
        // ('facultiesList:', facultiesList);

        return facultiesList;
    } catch (error) {
        console.error('Error fetching faculties list:', error);
        throw error;
    }
}