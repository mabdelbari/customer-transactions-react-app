const BASE_URL = "https://customer-transactions-server.vercel.app/transactions";

export async function getTransactions() {
  try {
    const res = await fetch(`${BASE_URL}`);

    if (!res.ok) throw new Error("Error Fetching Data");

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}