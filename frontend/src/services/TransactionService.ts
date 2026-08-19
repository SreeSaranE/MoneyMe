import api from "./api";
import type { UpdateTransactionType } from "@/Pages/transaction/TransactionType";

export const getTransactions = async () => {
    const response = await api.get("/transaction/transactions");
    return response.data;
}

export const updateTransactionApi = async (
    transactionId: string,
    updatedTransaction: UpdateTransactionType
) => {
    const response = await api.put(
        `/transaction/update/${transactionId}`,
        updatedTransaction)

    return response.status;
}