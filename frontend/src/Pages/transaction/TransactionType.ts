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

export type UpdateTransaction = {
    merchantName: string;
    amount: number;
    timestamp: string;
    categoryID: number;
    transactionTypeID: number;
    paymentMethodID: number;
    description: string;
};