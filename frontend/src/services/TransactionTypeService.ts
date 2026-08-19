import api from "./api";

export const getTransactionTypeApi = async () => {
    const response = await api.get("transaction-types");
    return response.data;
}