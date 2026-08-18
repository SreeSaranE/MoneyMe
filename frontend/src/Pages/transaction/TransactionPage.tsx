import { Button } from "@/components/ui/button";
import { useState } from "react";
import UpdateTransaction from "./UpdateTransaction";
import type { Transaction } from "./TransactionType";
import TransactionTable from "./TransactionTable";

export default function TransactionPage() {
    const [refreshKey, setRefreshKey] = useState(true);

    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function refreshTransactions() {
        setRefreshKey((prev) => !prev);
    }

    function handleTransactionClick(transaction: Transaction) {
        setSelectedTransaction(transaction);
        setIsDrawerOpen(true);
    }

    return (
        <div className="w-200 max-w-6xl mx-auto flex flex-col gap-10 p-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Transactions
                </h1>

                <Button onClick={refreshTransactions}>
                    Refresh
                </Button>
            </div>

            <TransactionTable
                refreshKey={refreshKey}
                onTransactionClick={handleTransactionClick}
            />

            <UpdateTransaction
                transaction={selectedTransaction}
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
            />

        </div>
    );
}