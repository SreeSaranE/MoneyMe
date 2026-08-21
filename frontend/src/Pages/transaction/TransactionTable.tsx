"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "../../services/TransactionService";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import type { Transaction } from "./TransactionType";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type TransactionTableProps = {
    refreshKey: boolean;
    onTransactionClick: (transaction: Transaction) => void;
};

function TransactionTable({
    refreshKey,
    onTransactionClick,
}: TransactionTableProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    async function loadTransactions() {
        const data = await getTransactions();

        const sortedData = [...data].sort(
            (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
        );
        setTransactions(sortedData);
    }

    useEffect(() => {
        loadTransactions();
    }, [refreshKey]);

    // Pagination calculations
    const totalPages = Math.ceil(
        transactions.length / rowsPerPage
    );

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedTransactions = transactions.slice(
        startIndex,
        endIndex
    );

    function handleRowsPerPageChange(value: string | null) {
        if (!value) return;

        setRowsPerPage(Number(value));
        setCurrentPage(1);
    }

    function handlePreviousPage() {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    function handleNextPage() {
        setCurrentPage((prev) =>
            Math.min(prev + 1, totalPages)
        );
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

        return `${date.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
        })}, ${date.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })}`;
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
                </div>

                <Table>
                    <TableBody>
                        {paginatedTransactions.map((item) => (
                            <TableRow
                                
                                key={item.transactionId}
                                onClick={() =>
                                    onTransactionClick(item)
                                }
                                className="cursor-pointer "
                            >
                                <TableCell />

                                <TableCell>
                                    {item.merchantName}
                                </TableCell>

                                <TableCell>
                                    <p>{item.category}</p>

                                    <p className="text-gray-400">
                                        {item.description}
                                    </p>
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

                {transactions.length > 0 && (
                    <div className="flex items-center justify-between pt-5">
                        {/* Rows per page */}
                        <Field
                            orientation="horizontal"
                            className="w-fit"
                        >
                            <FieldLabel htmlFor="select-rows-per-page">
                                Rows per page
                            </FieldLabel>

                            <Select
                                value={String(rowsPerPage)}
                                onValueChange={handleRowsPerPageChange}
                            >
                                <SelectTrigger
                                    className="w-20"
                                    id="select-rows-per-page"
                                >
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent align="start">
                                    <SelectGroup>
                                        <SelectItem value="5">
                                            5
                                        </SelectItem>

                                        <SelectItem value="10">
                                            10
                                        </SelectItem>

                                        <SelectItem value="25">
                                            25
                                        </SelectItem>

                                        <SelectItem value="50">
                                            50
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Pagination */}
                        <Pagination className="mx-0 w-auto">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handlePreviousPage();
                                        }}
                                        aria-disabled={
                                            currentPage === 1
                                        }
                                        className={
                                            currentPage === 1
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                        }
                                    />
                                </PaginationItem>

                                <PaginationItem>
                                    <span className="px-3 text-sm">
                                        {currentPage} of{" "}
                                        {totalPages}
                                    </span>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleNextPage();
                                        }}
                                        aria-disabled={
                                            currentPage === totalPages
                                        }
                                        className={
                                            currentPage === totalPages
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </>
    );
}

export default TransactionTable;