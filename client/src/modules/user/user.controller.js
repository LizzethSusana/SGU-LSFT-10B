const UserController = {};
const ENV = import.meta.env;

const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

UserController.getUsers = async () => {
    try{
        const res = await fetch(`${API_URL}/user`, {
            method: 'GET',
            headers:{
                'Accept':'application/json'
            }
        });
        const data = await res.json();
        return data;
    }catch(err){
        console.log(err);
        return null;
    }
};

UserController.getUserById = async (id) => {
    return await fetch(`${API_URL}/user/${id}`, {
        method: 'GET',
        headers:{
            'Accept':'application/json'
        }
    }).then(res => res.json()).then(res => {
        return res;
    }).catch(console.log);
};

UserController.createUser = async (userData) => {
    return await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(userData)
    }).then(res => res.json()).then(res => {
        return res;
    }).catch(console.log);
};

UserController.updateUser = async (id, userData) => {
    try{
        const payload = { ...userData, id };
        const res = await fetch(`${API_URL}/user`, {
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        return data;
    }catch(err){
        console.log(err);
        return null;
    }
};

UserController.deleteUser = async (id) => {
    try{
        const res = await fetch(`${API_URL}/user`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        return data;
    }catch(err){
        console.log(err);
        return null;
    }
};

export default UserController;