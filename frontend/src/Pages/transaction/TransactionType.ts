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


export type AddTransactionType = {
    merchantName: string;
    amount: number;
    timestamp: string;
    categoryID: number;
    transactionTypeID: number;
    paymentMethodID: number;
    description: string;
};

export type UpdateTransactionType = {
    merchantName: string;
    amount: number;
    timestamp: string;
    categoryID: number;
    transactionTypeID: number;
    paymentMethodID: number;
    description: string;
};

export type TransactionTypeNameType = {
    transactionTypeId: number;
    transactionTypeName: string;
}

export type PaymentMethodType = {
    paymentMethodId: number;
    paymentMethodName: string;
}