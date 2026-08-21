import { useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateTransaction from "./UpdateTransaction";
import type { Transaction } from "./TransactionType";
import TransactionTable from "./TransactionTable";
import AddTransaction from "./AddTransaction";

export default function TransactionPage() {
    const [refreshKey, setRefreshKey] = useState(false);

    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);

    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);

    function refreshTransactions() {
        setRefreshKey(!refreshKey);
    }

    function handleTransactionAdded() {
        setIsAddDrawerOpen(false);
        refreshTransactions();
    }

    function handleTransactionClick(transaction: Transaction) {
        setSelectedTransaction(transaction);
        setIsUpdateDrawerOpen(true);
    }

    return (
        <div className="w-200 max-w-6xl mx-auto flex flex-col gap-10 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Transactions
                </h1>

                <div className="flex items-center gap-2">
                    <AddTransaction
                        open={isAddDrawerOpen}
                        onOpenChange={setIsAddDrawerOpen}
                        onTransactionAdded={handleTransactionAdded}
                    />

                    <Button onClick={refreshTransactions}>
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Transactions */}
            <TransactionTable
                refreshKey={refreshKey}
                onTransactionClick={handleTransactionClick}
            />

            {/* Update Transaction */}
            <UpdateTransaction
                transaction={selectedTransaction}
                open={isUpdateDrawerOpen}
                onOpenChange={setIsUpdateDrawerOpen}
            />
        </div>
    );
}