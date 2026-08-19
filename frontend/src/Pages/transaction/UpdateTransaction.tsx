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
import {
    type Transaction,
    type UpdateTransactionType,
    type TransactionTypeNameType,
    type PaymentMethodType,
} from "./TransactionType";
import { Input } from "@/components/ui/input";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import { useEffect, useState } from "react";
import { getPaymentMethodApi } from "@/services/PaymentMethodService";
import { getTransactionTypeApi } from "@/services/TransactionTypeService";
import { type categoryType } from "../category/categoryType";
import { getCategories } from "@/services/CategoryService";
import { updateTransactionApi } from "@/services/TransactionService";

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

    const [transactionTypeData, setTransactionTypeData] = useState<
        TransactionTypeNameType[]
    >([]);

    const [paymentMethodData, setPaymentMethodData] = useState<
        PaymentMethodType[]
    >([]);

    const [categoryData, setCategoryData] = useState<
        categoryType[]
    >([]);

    const [updatedMerchantName, setUpdatedMerchantName] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedAmount, setUpdatedAmount] = useState("");
    const [updatedTimestamp, setUpdatedTimestamp] = useState("");
    const [updatedTransactionType, setUpdatedTransactionType] = useState("");
    const [updatedPaymentMethod, setUpdatedPaymentMethod] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");

    // Load transaction data when drawer opens
    useEffect(() => {
        if (open && transaction) {
            setUpdatedMerchantName(transaction.merchantName);
            setUpdatedCategory(transaction.category);
            setUpdatedAmount(String(transaction.amount));
            setUpdatedTimestamp(transaction.timestamp);
            setUpdatedTransactionType(transaction.transactionType);
            setUpdatedPaymentMethod(transaction.paymentMethod);
            setUpdatedDescription(transaction.description);
        }
    }, [open, transaction]);

    // Load transaction types when drawer opens
    useEffect(() => {
        if (!open) return;

        async function loadTransactionTypes() {
            try {
                const TransactionTypeResponse = await getTransactionTypeApi();
                setTransactionTypeData(TransactionTypeResponse);
            } catch (error) {
                console.error("Failed to load transaction types:", error);
            }
        }

        async function loadPaymentMethod() {
            try {
                const PaymentMethodResponse = await getPaymentMethodApi();
                setPaymentMethodData(PaymentMethodResponse);
            } catch (error) {
                console.error("Failed to load transaction types:", error);
            }
        }

        async function loadCategory() {
            try {
                const CategoryResponse = await getCategories();
                setCategoryData(CategoryResponse);
            } catch (error) {
                console.error("Failed to load transaction types:", error);
            }
        }

        loadTransactionTypes();
        loadPaymentMethod();
        loadCategory();
    }, [open]);

    async function handleSaveButton() {
        if (!transaction) return;

        const selectedTransactionType = transactionTypeData.find(
            (type) =>
                type.transactionTypeName === updatedTransactionType
        );

        const selectedPaymentMethod = paymentMethodData.find(
            (method) => 
                method.paymentMethodName === updatedPaymentMethod
        );

        const selectedCategory = categoryData.find(
            (category) => 
                category.categoryName === updatedCategory
        );

        const data: UpdateTransactionType = {
            merchantName: updatedMerchantName,
            amount: Number(updatedAmount),
            timestamp: updatedTimestamp,

            categoryID: 
                selectedCategory?.categoryId ?? 0,
            transactionTypeID:
                selectedTransactionType?.transactionTypeId ?? 0,
            paymentMethodID:
                selectedPaymentMethod?.paymentMethodId ?? 0,

            description: updatedDescription,
        };

        console.log("Update data:", data);

        await updateTransactionApi(transaction.transactionId, data);
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
                        <div className="space-y-4">
                            {/* Merchant */}
                            <div>
                                <p className="mb-1">Merchant:</p>

                                <Input
                                    value={updatedMerchantName}
                                    onChange={(e) =>
                                        setUpdatedMerchantName(e.target.value)
                                    }
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <p className="mb-1">Category:</p>

                                <Combobox
                                    items={categoryData.map(
                                        (category) =>
                                            category.categoryName
                                    )}
                                    value={updatedCategory}
                                    onValueChange={(value) => {
                                        setUpdatedCategory(value ?? "");
                                    }}
                                >
                                    <ComboboxInput
                                        placeholder="Select category"
                                    />

                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No category found.
                                        </ComboboxEmpty>

                                        <ComboboxList>
                                            {categoryData.map(
                                                (category) => (
                                                    <ComboboxItem
                                                        key={
                                                            category.categoryId
                                                        }
                                                        value={
                                                            category.categoryName
                                                        }
                                                    >
                                                        {
                                                            category.categoryName
                                                        }
                                                    </ComboboxItem>
                                                )
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            {/* Amount */}
                            <div>
                                <p className="mb-1">Amount: ₹</p>

                                <Input
                                    type="number"
                                    value={updatedAmount}
                                    onChange={(e) =>
                                        setUpdatedAmount(e.target.value)
                                    }
                                />
                            </div>

                            {/* Timestamp */}
                            <div>
                                <p className="mb-1">Timestamp:</p>

                                <Input
                                    type="datetime-local"
                                    value={updatedTimestamp}
                                    onChange={(e) =>
                                        setUpdatedTimestamp(e.target.value)
                                    }
                                />
                            </div>

                            {/* Transaction Type */}
                            <div>
                                <p className="mb-1">Type:</p>

                                <Combobox
                                    items={transactionTypeData.map(
                                        (type) =>
                                            type.transactionTypeName
                                    )}
                                    value={updatedTransactionType}
                                    onValueChange={(value) => {
                                        setUpdatedTransactionType(value ?? "");
                                    }}
                                >
                                    <ComboboxInput
                                        placeholder="Select transaction type"
                                    />

                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No transaction types found.
                                        </ComboboxEmpty>

                                        <ComboboxList>
                                            {transactionTypeData.map(
                                                (transactionType) => (
                                                    <ComboboxItem
                                                        key={
                                                            transactionType.transactionTypeId
                                                        }
                                                        value={
                                                            transactionType.transactionTypeName
                                                        }
                                                    >
                                                        {
                                                            transactionType.transactionTypeName
                                                        }
                                                    </ComboboxItem>
                                                )
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <p className="mb-1">Method:</p>

                                <Combobox
                                    items={paymentMethodData.map(
                                        (method) =>
                                            method.paymentMethodName
                                    )}
                                    value={updatedPaymentMethod}
                                    onValueChange={(value) => {
                                        setUpdatedPaymentMethod(value ?? "");
                                    }}
                                >
                                    <ComboboxInput
                                        placeholder="Select payment method"
                                    />

                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No methods found.
                                        </ComboboxEmpty>

                                        <ComboboxList>
                                            {paymentMethodData.map(
                                                (paymentMethod) => (
                                                    <ComboboxItem
                                                        key={
                                                            paymentMethod.paymentMethodId
                                                        }
                                                        value={
                                                            paymentMethod.paymentMethodName
                                                        }
                                                    >
                                                        {
                                                            paymentMethod.paymentMethodName
                                                        }
                                                    </ComboboxItem>
                                                )
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            {/* Description */}
                            <div>
                                <p className="mb-1">Description:</p>

                                <Input
                                    value={updatedDescription}
                                    onChange={(e) =>
                                        setUpdatedDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>

                <DrawerFooter className="flex flex-row">
                    <DrawerClose>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DrawerClose>

                    <DrawerClose>
                        <Button onClick={handleSaveButton}>
                            Save
                        </Button>
                    </DrawerClose>
                    
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default UpdateTransaction;