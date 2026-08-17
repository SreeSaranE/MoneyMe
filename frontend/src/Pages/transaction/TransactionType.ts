export type Transaction = {
    transactionId: string;
    merchantName: string;
    amount: number;
    timestamp: string;
    category: string;
    transactionType: string;
    paymentMethod: string;
    description: string;
};