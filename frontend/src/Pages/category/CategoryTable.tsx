import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
    getCategories,
} from "../../services/CategoryService";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { categoryType } from './categoryType';
import CategoryIcons from '@/components/icons/CategoryIcons';

type CategoryTableProps = {
    refreshKey: boolean;
    onCategoryClick: (category: categoryType) => void;
};

function CategoryTable({
    refreshKey,
    onCategoryClick
}: CategoryTableProps) {

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

    function handleViewAllButton() {
        setShowAllCategories((prev) => !prev);
    }

    // Show all when enabled, otherwise only first 5
    const visibleCategories = showAllCategories
        ? categories
        : categories.slice(0, 5);

    return (
        <>
        <div className="w-100 bg-accent rounded-3xl border p-5">

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
                    {categories.map((item) => (
                        <TableRow
                            key={item.categoryId}
                            onClick={() => onCategoryClick(item)}
                            className="cursor-pointer"
                        >

                            <TableCell className="font-medium">
                                <CategoryIcons iconId={item.categoryIconId} />
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

        </>
    );
}

export default CategoryTable;