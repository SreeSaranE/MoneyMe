import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input';
import {
    Check,
    X,
    MoreHorizontalIcon,
    Briefcase
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
    getCategories,
    deleteCategoryById,
    updateCategory
} from "../../services/CategoryService";
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

import type { categoryType } from './categoryType';

type CategoryTableProps = {
    refreshKey: boolean;
};

function CategoryTable({ refreshKey }: CategoryTableProps) {

    const [showEditCategory, seteShowEditCategory] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(0);
    const [editCategoryName, setEditCategoryName] = useState("");
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [categories, setCategories] = useState<categoryType[]>([]);

    useEffect(() => {
        loadCategory();
    }, [refreshKey]);

    async function loadCategory() {
        const data = await getCategories();
        setCategories(data);
    }

    async function deleteCategory(categoryId: number) {
        const deleteResult = await deleteCategoryById(categoryId);

        if (deleteResult !== null) {
            loadCategory();

            toast.add({
                type: "success",
                description: "Category deleted.",
            });
        }
    }

    function editCategory(categoryId: number, updateCategoryName: string) {
        setEditCategoryId(categoryId);
        setEditCategoryName(updateCategoryName);
        seteShowEditCategory(true);
    }

    async function saveEditCategory() {
        if (!editCategoryName.trim()) {
            toast.add({
                type: "error",
                description: "Category name cannot be empty.",
            });
            return;
        }

        const updateResponse = await updateCategory(
            editCategoryId,
            editCategoryName.trim()
        );

        if (updateResponse !== null) {
            await loadCategory();

            toast.add({
                type: "success",
                description: "Category updated.",
            });

            cancelUpdate();
        } else {
            toast.add({
                type: "error",
                description: "Something went wrong.",
            });
        }
    }

    function cancelUpdate() {
        setEditCategoryId(0);
        setEditCategoryName("");
        seteShowEditCategory(false);
    }

    function handleViewAllButton() {
        setShowAllCategories((prev) => !prev);
    }

    // Show all when enabled, otherwise only first 5
    const visibleCategories = showAllCategories
        ? categories
        : categories.slice(0, 5);

    return (
        <div className="w-200 bg-accent rounded-3xl border p-5">

            <div className="flex justify-between pb-5">
                <p>
                    Total Categories
                    <br />
                    {categories.length}
                </p>

                {categories.length > 5 && (
                    <Button
                        className="object-right"
                        variant="outline"
                        onClick={handleViewAllButton}
                    >
                        {showAllCategories ? "View Less" : "View All"}
                    </Button>
                )}
            </div>

            <Table>
                <TableBody>
                    {visibleCategories.map((item) => (
                        <TableRow key={item.categoryId}>

                            <TableCell className="font-medium">
                                <Briefcase />
                            </TableCell>

                            <TableCell>
                                {showEditCategory &&
                                item.categoryId === editCategoryId ? (
                                    <Input
                                        className="w-50 rounded-md"
                                        value={editCategoryName}
                                        onChange={(e) =>
                                            setEditCategoryName(e.target.value)
                                        }
                                    />
                                ) : (
                                    item.categoryName
                                )}
                            </TableCell>

                            <TableCell className="text-right">
                                {showEditCategory &&
                                item.categoryId === editCategoryId ? (
                                    <>
                                        <Button
                                            onClick={saveEditCategory}
                                            variant="secondary"
                                        >
                                            <Check />
                                        </Button>

                                        <Button
                                            onClick={cancelUpdate}
                                            variant="secondary"
                                        >
                                            <X />
                                        </Button>
                                    </>
                                ) : (
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
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    editCategory(
                                                        item.categoryId,
                                                        item.categoryName
                                                    )
                                                }
                                            >
                                                Edit
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() =>
                                                    deleteCategory(
                                                        item.categoryId
                                                    )
                                                }
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default CategoryTable;