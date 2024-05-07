import axios from 'axios';

const getUsers = async () => {
    try {
        const response = await axios.get('https://reqres.in/api/users');
        return response.data.data; // Assuming the user data is stored under the 'data' key
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export default getUsers;