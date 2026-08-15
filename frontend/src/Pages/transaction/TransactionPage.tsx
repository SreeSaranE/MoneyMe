
import { useEffect, useState } from "react";
import { getTransactions } from "../../services/TransactionService";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

type Transaction = {
    transactionId: string;
    merchantName: string;
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
        console.log(data);
        
    }

    useEffect(() => {
        loadTransactions();
        
    }, []);

    return (
    <div className="grid grid-cols-1 gap-4">

        {/* Header */}
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Transactions</h1>

            <Button onClick={loadTransactions}>
                Refresh
            </Button>
        </div>

        {/* Categories Table */}
        <div className="w-full rounded-lg border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">Merchant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>DateTime</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-25 text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {transactions.map((item) => (
                    <TableRow key={item.transactionId}>
                        <TableCell>{item.merchantName}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.timestamp}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8"
                                >
                                    <MoreHorizontalIcon />
                                    <span className="sr-only">
                                    Open menu
                                    </span>
                                </Button>
                                }
                            />

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                Edit
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                variant="destructive">
                                Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>

    </div>
    );
}
