
import { useEffect, useState } from "react";
import { getTransactions } from "../../services/TransactionService";

type Transaction = {
    transactionId: string;
    transactionName: string;
    amount: number;
    timestamp: string;
    category: string;
    description: string;
};

export default function TransactionPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function loadTransactions() {
        const data = await getTransactions();
        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <div className="transactionContent">

            <div className="transactionHeader">
                <h2>Transactions</h2>

                <button onClick={loadTransactions}>
                    Refresh
                </button>
            </div>

            <table className="transactionTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((item) => (
                        <tr key={item.transactionId}>
                            <td>{item.transactionName}</td>
                            <td>{item.category}</td>
                            <td>₹{item.amount}</td>
                            <td>
                                {new Date(item.timestamp).toLocaleString()}
                            </td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
