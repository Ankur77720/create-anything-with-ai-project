import API from "./axios";

export const getTransactions = async (token) => {
  const res = await API.get("/transactions", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTransaction = async (data, token) => {
  const res = await API.post("/transactions", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
