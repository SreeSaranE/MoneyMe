import { useState, useEffect } from "react";
import { Check, MoreHorizontalIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast"
import {
    getCategories,
    getCatgoryById,
    addCategory,
    deleteCategoryById,
    updateCategory
} from "../../services/CategoryService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type categoryType = {
    categoryId: number,
    categoryName: string
}

export default function CategoryPage() {

    const [ category, setCategory ] = useState({
        categoryId: null,
        categoryName: ""
    });

    const [ categories, setCategories ] = useState<categoryType[]>([]);
    const [ newCategory, setNewCategory ] = useState("");
    const [ showEditCategory, seteShowEditCategory ] = useState(false);
    const [ editCategoryId, setEditCategoryId] = useState(0);
    const [ editCategoryName, setEditCategoryName] = useState("");

    useEffect(() => { loadCategory() }, [])

    async function loadCategory() {
        const data = await getCategories();
        setCategories(data);
        console.log("Data refreshed");
    }

    async function getcategory(categoryId: number) {
        const data = await getCatgoryById(categoryId);
        setCategory(data);
    }

    async function addCate() {
        var addResult = await addCategory(newCategory);
        console.log(addResult.status);
        
        if (addResult.status === 201) {
            setNewCategory("")
            loadCategory();
            toast.add({
                type: "success",
                description: "Category added.",
            })
            return;
        }
        toast.add({
            type: "error",
            description: "Something went wrong.",
        })
    }
    
    async function deleteCategory(categoryId: number) {
        var deleteResult = await deleteCategoryById(categoryId);
        if (deleteResult !== null){
            loadCategory();
            toast.add({
                type: "success",
                description: "Category deleted.",
            })
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
    
    return (
    <div className="w-150 max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <Button onClick={loadCategory}>
            Refresh
        </Button>
        </div>

        {/* Add Category */}
        <div className="w-full rounded-lg border p-4 space-y-3">
        <h2 className="text-lg font-medium">
            Add Category
        </h2>

        <div className="flex items-center gap-3">
            <Input
            type="text"
            placeholder="Category name"
            value={newCategory}
            className="max-w-md"
            onChange={(e) =>
                setNewCategory(e.target.value)
            }
            />

            <Button onClick={addCate}>
            Add Category
            </Button>
        </div>
        </div>

        {/* Categories Table */}
        <div className="w-full rounded-lg border">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="w-25">ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-25 text-right">
                Actions
                </TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>
            {categories.map((item) => (
                <TableRow key={item.categoryId}>
                <TableCell className="font-medium">
                    {item.categoryId}
                </TableCell>

                <TableCell>
                    {(showEditCategory && (item.categoryId === editCategoryId))
                    ? <Input
                        className="w-50 rounded-md"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                    />
                    : item.categoryName}
                </TableCell>

                <TableCell className="text-right">

                    {(showEditCategory && (item.categoryId === editCategoryId))
                    ? <>
                        <Button onClick={() => saveEditCategory()} variant="secondary" ><Check /></Button>
                        <Button onClick={() => cancelUpdate()} variant="secondary" ><X /></Button>
                      </>
                      
                    : <DropdownMenu>
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
                                onClick={() => (editCategory(item.categoryId, item.categoryName))}>
                            Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                            variant="destructive"
                            onClick={() => (deleteCategory(item.categoryId))}>
                            Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>

        {/* Get Category */}
        <div className="w-full rounded-lg border p-4 space-y-3">
        <h2 className="text-lg font-medium">
            Find Category
        </h2>

        <div className="flex items-center gap-3">
            <Input
            type="number"
            min={1}
            max={categories.length}
            placeholder="Category ID"
            className="w-48"
            onChange={(e) =>
                getcategory(Number(e.target.value))
            }
            />

            <p className="text-sm text-muted-foreground">
            {category.categoryId} - {category.categoryName}
            </p>
        </div>
        </div>

    </div>
    );
}