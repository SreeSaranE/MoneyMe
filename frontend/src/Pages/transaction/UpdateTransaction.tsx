import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import type { Transaction } from "./TransactionType";

type UpdateTransactionProps = {
    transaction: Transaction | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

function UpdateTransaction({
    transaction,
    open,
    onOpenChange,
}: UpdateTransactionProps) {
    const isMobile = useIsMobile();
    const swipeDirection = isMobile ? "down" : "right";

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            showSwipeHandle={isMobile}
            swipeDirection={swipeDirection}
        >
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        Transaction Details
                    </DrawerTitle>

                    <DrawerDescription>
                        {transaction
                            ? `Transaction ID: ${transaction.transactionId}`
                            : ""}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 p-6">
                    {transaction && (
                        <div>
                            <p>Merchant: {transaction.merchantName}</p>
                            <p>Category: {transaction.category}</p>
                            <p>Amount: ₹{transaction.amount}</p>
                            <p>Timestamp: {transaction.timestamp}</p>
                            <p>
                                Type: {transaction.transactionType}
                            </p>
                            <p>
                                Description: {transaction.description}
                            </p>
                        </div>
                    )}
                </div>

                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default UpdateTransaction;