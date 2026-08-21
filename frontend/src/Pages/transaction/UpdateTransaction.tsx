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
import {
    type Transaction,
    type UpdateTransactionType,
    type TransactionTypeNameType,
    type PaymentMethodType,
} from "./TransactionType";
import { getPaymentMethodApi } from "@/services/PaymentMethodService";
import { getTransactionTypeApi } from "@/services/TransactionTypeService";
import { type categoryType } from "../category/categoryType";
import { getCategories } from "@/services/CategoryService";
import { updateTransactionApi } from "@/services/TransactionService";
import { toast } from "@/components/ui/toast";

type UpdateTransactionProps = {
    transaction: Transaction | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTransactionAdded: () => void;
};

const formatTimestampForInput = (timestamp: string) => {
    return timestamp.slice(0, 16);
};

const formatTimestampForApi = (timestamp: string) => {
    return timestamp.length === 16
        ? `${timestamp}:00`
        : timestamp;
};

function UpdateTransaction({
    transaction,
    open,
    onOpenChange,
    onTransactionAdded,
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
            setUpdatedTimestamp(formatTimestampForInput(transaction.timestamp));
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

    async function saveUpdateTransaction(
        transactionId: string,
        data: UpdateTransactionType)
    {
        const updateResponse = await updateTransactionApi(transactionId, data);

        if (updateResponse.status === 204)
        {
                toast.add({
                    type: "success",
                    description: "Transaction updated successfully.",
                });

                onTransactionAdded();
                return;     
        }

    }

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
            timestamp: formatTimestampForApi(updatedTimestamp),

            categoryID: 
                selectedCategory?.categoryId ?? 0,
            transactionTypeID:
                selectedTransactionType?.transactionTypeId ?? 0,
            paymentMethodID:
                selectedPaymentMethod?.paymentMethodId ?? 0,

            description: updatedDescription,
        };

        saveUpdateTransaction(transaction.transactionId, data)

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
                                    items={categoryData}
                                    itemToStringLabel={(category) => category.categoryName}
                                    itemToStringValue={(category) => category.categoryName}
                                    value={
                                        categoryData.find(
                                            (category) => category.categoryName === updatedCategory
                                        ) ?? null
                                    }
                                    onValueChange={(value) => {
                                        setUpdatedCategory(value?.categoryName ?? "");
                                    }}
                                >
                                    <ComboboxInput placeholder="Select category" />

                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No category found.
                                        </ComboboxEmpty>

                                        <ComboboxList>
                                            {(category) => (
                                                <ComboboxItem
                                                    key={category.categoryId}
                                                    value={category}
                                                >
                                                    {category.categoryName}
                                                </ComboboxItem>
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
                                    items={transactionTypeData}
                                    itemToStringLabel={(type) => type.transactionTypeName}
                                    itemToStringValue={(type) => type.transactionTypeName}
                                    value={
                                        transactionTypeData.find(
                                            (type) =>
                                                type.transactionTypeName === updatedTransactionType
                                        ) ?? null
                                    }
                                    onValueChange={(value) => {
                                        setUpdatedTransactionType(
                                            value?.transactionTypeName ?? ""
                                        );
                                    }}
                                >
                                    <ComboboxInput placeholder="Select transaction type" />

                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No transaction types found.
                                        </ComboboxEmpty>

                                        <ComboboxList>
                                            {(type) => (
                                                <ComboboxItem
                                                    key={type.transactionTypeId}
                                                    value={type}
                                                >
                                                    {type.transactionTypeName}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <p className="mb-1">Method:</p>

                                <Combobox
                                    items={paymentMethodData}
                                    itemToStringLabel={(method) => method.paymentMethodName}
                                    itemToStringValue={(method) => method.paymentMethodName}
                                    value={
                                        paymentMethodData.find(
                                            (method) =>
                                                method.paymentMethodName === updatedPaymentMethod
                                        ) ?? null
                                    }
                                    onValueChange={(value) => {
                                        setUpdatedPaymentMethod(
                                            value?.paymentMethodName ?? ""
                                        );
                                    }}
                                >
                                    <ComboboxInput placeholder="Select payment method" />

                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No methods found.
                                        </ComboboxEmpty>

                                        <ComboboxList>
                                            {(method) => (
                                                <ComboboxItem
                                                    key={method.paymentMethodId}
                                                    value={method}
                                                >
                                                    {method.paymentMethodName}
                                                </ComboboxItem>
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