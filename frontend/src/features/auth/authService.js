import axios from 'axios'

const API_URL='/api/user/'

const register = async(userData)=>{
    const resp = await axios.post(API_URL,userData)
    if(resp.data){
        localStorage.setItem('user',JSON.stringify(resp.data))
    }
    return resp.data
}

const login = async(userData)=>{
    const resp = await axios.post(API_URL+'login',userData)
    if(resp.data){
        localStorage.setItem('user',JSON.stringify(resp.userData))
    }
    return resp.data
}


const getTexts = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.get(API_URL+ 'me', config);
    console.log(resp);
    return resp.data;
  };

const logout = ()=>{
    localStorage.removeItem('user')
}

const authService = {register,login, getTexts,logout}
export default authService