import { useEffect, useState } from "react";
import {
    type AddTransactionType,
    type PaymentMethodType,
    type TransactionTypeNameType,
} from "./TransactionType";
import { addTransactionApi } from "@/services/TransactionService";
import { toast } from "@/components/ui/toast";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import type { categoryType } from "../category/categoryType";
import { Button } from "@/components/ui/button";
import { getTransactionTypeApi } from "@/services/TransactionTypeService";
import { getPaymentMethodApi } from "@/services/PaymentMethodService";
import { getCategories } from "@/services/CategoryService";

type AddTransactionProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTransactionAdded: () => void;
};

const formatTimestampForApi = (timestamp: string) => {
    return timestamp.length === 16
        ? `${timestamp}:00`
        : timestamp;
};

function AddTransaction({
    open,
    onOpenChange,
    onTransactionAdded,
}: AddTransactionProps) {
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

    const [newMerchantName, setNewMerchantName] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newAmount, setNewAmount] = useState("");
    const [newTimestamp, setNewTimestamp] = useState("");
    const [newTransactionType, setNewTransactionType] = useState("");
    const [newPaymentMethod, setNewPaymentMethod] = useState("");
    const [newDescription, setNewDescription] = useState("");

    async function addNewTransaction(newTransaction: AddTransactionType) {
        if (newTransaction === undefined) {
            return;
        }

        try {
            const addResult = await addTransactionApi(newTransaction);

            console.log(addResult.status);

            if (addResult.status === 201) {
                toast.add({
                    type: "success",
                    description: "Transaction added successfully.",
                });

                onTransactionAdded();
                clearEntries();
                return;
            }

            toast.add({
                type: "error",
                description: "Something went wrong.",
            });
        } catch (error) {
            console.error(error);

            toast.add({
                type: "error",
                description: "Something went wrong.",
            });
        }
    }

    async function handleSaveButton() {
        const selectedTransactionType = transactionTypeData.find(
            (type) =>
                type.transactionTypeName === newTransactionType
        );

        const selectedPaymentMethod = paymentMethodData.find(
            (method) => 
                method.paymentMethodName === newPaymentMethod
        );

        const selectedCategory = categoryData.find(
            (category) => 
                category.categoryName === newCategory
        );

        const data: AddTransactionType = {
            merchantName: newMerchantName,
            amount: Number(newAmount),
            timestamp: formatTimestampForApi(newTimestamp),

            categoryID: 
                selectedCategory?.categoryId ?? 0,
            transactionTypeID:
                selectedTransactionType?.transactionTypeId ?? 0,
            paymentMethodID:
                selectedPaymentMethod?.paymentMethodId ?? 0,

            description: newDescription,
        };
        
        addNewTransaction(data);
    }

    function clearEntries() {
        setNewMerchantName("")
        setNewCategory("")
        setNewAmount("")
        setNewTimestamp("")
        setNewTransactionType("")
        setNewPaymentMethod("")
        setNewDescription("")
    }

    return (
        <>
            <Button onClick={() => onOpenChange(true)}>
                Add Transaction
            </Button>

            <Drawer
                open={open}
                onOpenChange={onOpenChange}
                showSwipeHandle={isMobile}
                swipeDirection={swipeDirection}
            >
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            Add Transaction
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="flex-1 p-6">
                        <div className="space-y-4">
                            {/* Merchant */}
                            <div>
                                <p className="mb-1">
                                    Merchant:
                                </p>

                                <Input
                                    value={newMerchantName}
                                    onChange={(e) =>
                                        setNewMerchantName(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <p className="mb-1">
                                    Category:
                                </p>

                                <Combobox
                                    items={categoryData}
                                    itemToStringLabel={(category) =>
                                        category.categoryName
                                    }
                                    itemToStringValue={(category) =>
                                        category.categoryName
                                    }
                                    value={
                                        categoryData.find(
                                            (category) =>
                                                category.categoryName ===
                                                newCategory
                                        ) ?? null
                                    }
                                    onValueChange={(value) => {
                                        setNewCategory(
                                            value?.categoryName ?? ""
                                        );
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
                                            {(category) => (
                                                <ComboboxItem
                                                    key={
                                                        category.categoryId
                                                    }
                                                    value={category}
                                                >
                                                    {
                                                        category.categoryName
                                                    }
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            {/* Amount */}
                            <div>
                                <p className="mb-1">
                                    Amount: ₹
                                </p>

                                <Input
                                    type="number"
                                    value={newAmount}
                                    onChange={(e) =>
                                        setNewAmount(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Timestamp */}
                            <div>
                                <p className="mb-1">
                                    Timestamp:
                                </p>

                                <Input
                                    type="datetime-local"
                                    value={newTimestamp}
                                    onChange={(e) =>
                                        setNewTimestamp(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Transaction Type */}
                            <div>
                                <p className="mb-1">
                                    Type:
                                </p>

                                <Combobox
                                    items={transactionTypeData}
                                    itemToStringLabel={(type) =>
                                        type.transactionTypeName
                                    }
                                    itemToStringValue={(type) =>
                                        type.transactionTypeName
                                    }
                                    value={
                                        transactionTypeData.find(
                                            (type) =>
                                                type.transactionTypeName ===
                                                newTransactionType
                                        ) ?? null
                                    }
                                    onValueChange={(value) => {
                                        setNewTransactionType(
                                            value?.transactionTypeName ??
                                                ""
                                        );
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
                                            {(type) => (
                                                <ComboboxItem
                                                    key={
                                                        type.transactionTypeId
                                                    }
                                                    value={type}
                                                >
                                                    {
                                                        type.transactionTypeName
                                                    }
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <p className="mb-1">
                                    Method:
                                </p>

                                <Combobox
                                    items={paymentMethodData}
                                    itemToStringLabel={(method) =>
                                        method.paymentMethodName
                                    }
                                    itemToStringValue={(method) =>
                                        method.paymentMethodName
                                    }
                                    value={
                                        paymentMethodData.find(
                                            (method) =>
                                                method.paymentMethodName ===
                                                newPaymentMethod
                                        ) ?? null
                                    }
                                    onValueChange={(value) => {
                                        setNewPaymentMethod(
                                            value?.paymentMethodName ??
                                                ""
                                        );
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
                                            {(method) => (
                                                <ComboboxItem
                                                    key={
                                                        method.paymentMethodId
                                                    }
                                                    value={method}
                                                >
                                                    {
                                                        method.paymentMethodName
                                                    }
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            {/* Description */}
                            <div>
                                <p className="mb-1">
                                    Description:
                                </p>

                                <Input
                                    value={newDescription}
                                    onChange={(e) =>
                                        setNewDescription(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <DrawerFooter className="flex flex-row">
                        <DrawerClose>
                            <Button variant="outline">
                                Close
                            </Button>
                        </DrawerClose>

                        <Button onClick={handleSaveButton}>
                            Save
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default AddTransaction;