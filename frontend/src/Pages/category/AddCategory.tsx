import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addCategory } from "@/services/CategoryService";
import { useState } from "react";
import { toast } from "@/components/ui/toast";

type AddCategoryProps = {
    onCategoryAdded: () => void;
};

function AddCategory({ onCategoryAdded }: AddCategoryProps) {
    const [newCategory, setNewCategory] = useState("");
    const [open, setOpen] = useState(false);

    async function addNewCategory() {
        const addResult = await addCategory(newCategory);

        console.log(addResult.status);

        if (addResult.status === 201) {
            setNewCategory("");
            setOpen(false);

            toast.add({
                type: "success",
                description: "Category added.",
            });

            onCategoryAdded();
            return;
        }

        toast.add({
            type: "error",
            description: "Something went wrong.",
        });
    }

    function cancel() {
        setNewCategory("");
        setOpen(false);
    }

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger render={<Button />}>
                    Add Category
                </PopoverTrigger>

                <PopoverContent>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="category-name">Name</Label>

                        <Input
                            className="col-span-2 h-8"
                            id="category-name"
                            type="text"
                            value={newCategory}
                            placeholder="Category"
                            onChange={(e) =>
                                setNewCategory(e.target.value)
                            }
                        />

                        <div className="col-span-3 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={cancel}
                            >
                                Cancel
                            </Button>

                            <Button onClick={addNewCategory}>
                                Add
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default AddCategory;