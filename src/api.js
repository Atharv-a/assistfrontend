import axios from "axios";
import errorMessage from "./Utility";

const API_URL = process.env.REACT_APP_API_URL;

export default async function signup(data){
    try {
        const response = await axios.post(
            `${API_URL}/api/auth/register`,
            data,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        );
        if(response.status === 200){
            const jwt = response.data.token;
            sessionStorage.setItem('ASSIST_CONNECT_JWT',jwt);
            return true;
        } else {
            errorMessage("Error Encountered in Signup. If you already have an account, please proceed to login", "LoginError");
            return false;
        }
    } catch (error) {
        errorMessage("Error Encountered in Signup. If you already have an account, please proceed to login", "LoginError");
        return false;
    }
}

export async function signin(data){
    try {
        const response = await axios.post(
            `${API_URL}/api/auth/authenticate`,
            data,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        );
        if(response.status === 200){
            const jwt = response.data.token;
            sessionStorage.setItem('ASSIST_CONNECT_JWT',jwt);
            return true;
        } else {
            errorMessage("Enter correct credentials or if you don't have an account signup", "LoginError");
            return false;
        }
    } catch (error) {
        errorMessage("Enter correct credentials or if you don't have an account signup", "LoginError");
        return false;
    }
}

export async function fetchFormData(){
    try {
        const response = await axios.get(
            `${API_URL}/api/form/getdata`,
            {
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem("ASSIST_CONNECT_JWT")}`,
                    'Content-Type':'application/json'
                }
            }
        );
        if(response.status === 200){
            return response.data;
        } else if(response.status === 401){
            sessionStorage.setItem("ASSIST_CONNECT_LOGGEDIN","false");
            return false;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function postFormData(data){
    try {
        const response = await axios.post(
            `${API_URL}/api/form/submit`,
            data,
            {
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem("ASSIST_CONNECT_JWT")}`,
                    'Content-Type':'application/json'
                }
            }
        );
        if(response.status === 200){
            return true;
        } else if(response.status === 401){
            sessionStorage.setItem("ASSIST_CONNECT_LOGGEDIN","false");
            return false;
        } else {
            errorMessage("Cannot submit data now, please try later", "FormError");
            return false;
        }
    } catch (error) {
        errorMessage("Cannot submit data now, please try later", "FormError");
        return false;
    }
}
