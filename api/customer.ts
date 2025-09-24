import { API_URL } from "../constants/constant";
import { Customer } from "../types/customerType";

export async function addCustomer(
  params: Customer
): Promise<{ isSuccess: boolean; message: string }> {
  try {
    const url = API_URL + "api/customer/createCustomer";
    console.log("öğeler buraya geldi", params);

    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "addCustomer failed");
    }
    const customer = await response.json();
    return customer;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during register");
  }
}

export async function customerList(userID: number) {
  try {
    const url = `${API_URL}api/customer/customerList/${userID}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Müşteriler başarıyla getirildi .");
    }

    const productList = await response.json();
    return productList;
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    throw new Error("Müşteriler getirilirken bir hata oluştu.");
  }
}
