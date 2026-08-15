import { Input } from "@/components/ui/input"
import { getCategories, getCatgoryById } from "@/services/CategoryService";
import { useEffect, useState } from "react";

type categoryType = {
    categoryId: number,
    categoryName: string
}

function GetCategoryById() {
    
    const [ category, setCategory ] = useState({
        categoryId: null,
        categoryName: ""
    });

    const [ categories, setCategories ] = useState<categoryType[]>([]);

    useEffect(() => {
        loadCategory();
    }, [category]);

    async function loadCategory() {
        const data = await getCategories();
        setCategories(data);
    }

    async function getcategory(categoryId: number) {
        const data = await getCatgoryById(categoryId);
        setCategory(data);
    }

  return (
    <div className="w-auto rounded-lg border p-4 space-y-3">
        <h2 className="text-lg font-medium">
            Find Category
        </h2>

        <div className="">
            <Input
            type="number"
            min={1}
            max={categories.length}
            placeholder="Category ID"
            className="w-48"
            onChange={(e) => getcategory(Number(e.target.value))}
            />

            <p className="text-muted-foreground"><br />
            {category.categoryId} - {category.categoryName}
            </p>
        </div>
    </div>
  )
}

export default GetCategoryById