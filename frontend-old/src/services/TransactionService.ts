import api from "./api";

export const getTransactions = async () => {
    const response = await api.get("/transaction/transactions");
    return response.data;
}