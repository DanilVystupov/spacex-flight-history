import axios from 'axios';

export const fetchMissionsData = async () => {
    try {
        const response = await axios.get('https://api.spacexdata.com/v5/launches');
        return response.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error.message);
    }
};