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

export const updateTransaction = async (id, data, token) => {
    const res = await API.put(`/transactions/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const deleteTransaction = async (id, token) => {
    const res = await API.delete(`/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

