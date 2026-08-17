"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "../../services/TransactionService";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import type { Transaction } from "./TransactionType"
import UpdateTransaction from "./UpdateTransaction";

type TransactionTableProps = {
    refreshKey: boolean;
    onTransactionClick: (transaction: Transaction) => void;
};

function TransactionTable({
    refreshKey,
    onTransactionClick,
}: TransactionTableProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [showAllTransactions, setShowAllTransactions] = useState(false);

    const [selectedTransaction] =
        useState<Transaction | null>(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    async function loadTransactions() {
        const data = await getTransactions();
        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, [refreshKey]);

    function handleViewAllButton() {
        setShowAllTransactions((prev) => !prev);
    }

    function formatDateTime(timestamp: string) {
        const date = new Date(timestamp);
        const now = new Date();

        const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        if (isToday) {
            return `Today, ${date.toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })}`;
        }

        return date.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
        });
    }

    function formatAmount(amount: number) {
        return amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return (
        <>
            <div className="w-auto rounded-3xl border bg-accent p-5">
                <div className="flex justify-between pb-5">
                    <p>
                        Total Transactions
                        <br />
                        {transactions.length}
                    </p>

                    {transactions.length > 5 && (
                        <Button
                            variant="outline"
                            onClick={handleViewAllButton}
                        >
                            {showAllTransactions ? "View Less" : "View All"}
                        </Button>
                    )}
                </div>

                <Table>
                    <TableBody>
                        {transactions
                            .slice(
                                0,
                                showAllTransactions
                                    ? transactions.length
                                    : 5
                            )
                            .map((item) => (
                                <TableRow
                                    key={item.transactionId}
                                    onClick={() => onTransactionClick(item)}
                                    className="cursor-pointer"
                                >
                                    <TableCell />

                                    <TableCell>
                                        {item.merchantName}
                                    </TableCell>

                                    <TableCell>
                                        <p>{item.category}</p>
                                        
                                        <p className="text-gray-400">{item.description}</p>
                                        
                                    </TableCell>

                                    <TableCell>
                                        {formatDateTime(item.timestamp)}
                                    </TableCell>

                                    <TableCell
                                        className={
                                            item.transactionType === "Income"
                                                ? "text-green-600 text-right"
                                                : "text-right"
                                        }
                                    >
                                        {item.transactionType === "Income"
                                        ? `+${formatAmount(item.amount)}`
                                        : `-${formatAmount(item.amount)}`}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>

            <UpdateTransaction
                transaction={selectedTransaction}
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
            />
        </>
    );
}
export default TransactionTable;