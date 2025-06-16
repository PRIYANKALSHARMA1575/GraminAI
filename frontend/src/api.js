import axios from "axios";
const BASE_URL = "http://localhost:3000"; // Backend server

export async function getUser(Email){
  const response= await axios.get(`${BASE_URL}/users/${Email}`);
  if(response.status===200){
    return response.data;
  }else{
    return 
  }
}

export async function getUsers(){
  const response = await axios.get(`${BASE_URL}/users`);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch users");
  }
}

export async function createUser(Name, Email, Password, Contact, Age) {
  const response = await axios.post(`${BASE_URL}/users`, {
    Name,
    Email,
    Password,
    Contact,
    Age
  });
  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error("Failed to create user");
  }
}

export async function loginUser(Email, Password) {
  const response = await axios.post(`${BASE_URL}/login`, {
    Email,
    Password
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Login failed");
  }
}
export async function registerUser(Name, Email, Password, Contact, Age) {
  const response = await axios.post(`${BASE_URL}/users`, {
    Name,
    Email,
    Password,
    Contact,
    Age
  });
  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error("Registration failed");
  }
}

export async function getUserProfile(email) {
  const response = await axios.get(`${BASE_URL}/profile/${email}`);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch user profile");
  }
}



