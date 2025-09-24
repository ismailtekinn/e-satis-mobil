import axios from "axios";
import { Register, SignIn } from "../types/authType";
import Constants from "expo-constants";
import https from "https";
import { API_URL } from "../constants/constant";

export async function login(params: SignIn) {
  try {
    console.log("form data backende gönderilmek üzere alındı", params);
    const url = API_URL + 'api/auth/login';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: params.phone,
        password: params.password,
      }),
      mode: "cors",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }
    const userData = await response.json();
    console.log("response ekrana yazdırıldı ", userData);
    return userData;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during login");
  }
}

export async function register(params: Register) {
  console.log("Register data verileri ekrana yazdırıldı", params);
  try {
    const url = API_URL + 'api/auth/register';
    console.log("kayıt verileri console yazdırıldı");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "register failed");
    }

    const userData = await response.json();
    console.log("Burası register methodu ", userData.message);
    return userData;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}
