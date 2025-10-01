import { BackendResponse, SqlData } from "../types/apiresponse/genericResponseType";

export async function fetchSqlData<T>(
  url: string,
  params: Record<string, unknown>
): Promise<SqlData<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.ErrorMessage || "API isteği başarısız oldu.");
    }

    const backendResponse: BackendResponse = await response.json();

    if (!backendResponse.SQL_Data) {
      throw new Error("SQL_Data alanı boş döndü.");
    }

    return JSON.parse(backendResponse.SQL_Data) as SqlData<T>;
  } catch (error: any) {
    console.error("API hatası:", error);
    throw new Error(error.message || "API sırasında bir hata oluştu.");
  }
}