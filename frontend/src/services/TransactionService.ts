import api from "./api";
import type { AddTransactionType, UpdateTransactionType } from "@/Pages/transaction/TransactionType";

export const getTransactions = async () => {
    const response = await api.get("/transaction/transactions");
    return response.data;
}

export const addTransactionApi = async (
    newTransaction: AddTransactionType
) => {
    const response = await api.post(
        "/transaction/add",
        newTransaction
    );

    return response;1
}

export const updateTransactionApi = async (
    transactionId: string,
    updatedTransaction: UpdateTransactionType
) => {
    const response = await api.put(
        `/transaction/update/${transactionId}`,
        updatedTransaction
    );

    return response.status;
}