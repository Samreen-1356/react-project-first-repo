import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const fetchUsers = async () => {
    const res = await axios.get(`${BASE_URL}/users?limit=50`);
    return res.data.users;
};