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
import type { Transaction, UpdateTransaction } from "./TransactionType";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { useEffect, useState } from "react";
import { updateCategory } from "@/services/CategoryService";


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

    const frameworks = ["Income", "Expense"]

    const [updatedMerchantName, setUpdatedMerchantName] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedAmount, setUpdatedAmount] = useState(0);
    const [updatedTimestamp, setUpdatedTimestamp] = useState("");
    const [updatedUpdateTransactionType, setUpdatedUpdateTransactionType] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");

    useEffect(() => {
        if (open && (transaction != null)) {
            setUpdatedMerchantName(transaction.merchantName);
            setUpdatedCategory(transaction.category);
            setUpdatedAmount(transaction.amount);
            setUpdatedTimestamp(transaction.timestamp);
            setUpdatedUpdateTransactionType(transaction.transactionType);
            setUpdatedDescription(transaction.description);
        }
    }, [open])


    function handleSaveButton() {
        const data: UpdateTransaction = {
            merchantName: updatedMerchantName,
            amount: updatedAmount,
            timestamp: updatedTimestamp,
            categoryID: 1,
            transactionTypeID: 2,
            paymentMethodID: 3,
            description: updatedDescription,
        };

        console.log(data);
        
    }


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
                            <p>Merchant:</p>
                            <Input
                                value={updatedMerchantName}
                                onChange={(e) => setUpdatedMerchantName(e.target.value)}
                            />

                            <p>Category:</p>
                            <Input
                                value={updatedCategory}
                                onChange={(e) => setUpdatedCategory(e.target.value)}
                            />

                            <p>Amount: ₹</p>
                            <Input
                                value={String(updatedAmount)}
                                onChange={(e) => setUpdatedAmount(Number(e.target.value))}
                            />

                            <p>Timestamp:</p>
                            <Input
                                value={updatedTimestamp}
                                onChange={(e) => setUpdatedTimestamp(e.target.value)}
                            />

                            <p>Type:</p>
                            <Input
                                value={updatedUpdateTransactionType}
                                onChange={(e) => setUpdatedUpdateTransactionType(e.target.value)}
                            />

                            <p>Description:</p>
                            <Input
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                            />

{/* <Combobox items={frameworks}>
      <ComboboxInput placeholder={transaction.transactionType} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox> */}


                        </div>
                    )}
                </div>

                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DrawerClose>

                    <Button onClick={handleSaveButton}>Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default UpdateTransaction;