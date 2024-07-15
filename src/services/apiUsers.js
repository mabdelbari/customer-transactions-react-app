const BASE_URL = "https://customer-transactions-server.vercel.app/customers";

export async function getUsers() {
  try {
    const res = await fetch(`${BASE_URL}`);

    if (!res.ok) throw new Error("Error Fetching Data");

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
