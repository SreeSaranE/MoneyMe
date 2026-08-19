import api from "./api";
import type { UpdateTransaction } from "@/Pages/transaction/TransactionType";

export const getTransactions = async () => {
    const response = await api.get("/transaction/transactions");
    return response.data;
}

export const updateTransactionApi = async (
    transactionId: string,
    updatedTransaction: UpdateTransaction
) => {
    const response = await api.put(
        `/transaction/update/${transactionId}`,
        updatedTransaction)
}