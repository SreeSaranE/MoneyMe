import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddCategory from "./AddCategory";
import CategoryTable from "./CategoryTable";
import GetCategoryById from "./GetCategoryById";

export default function CategoryPage() {

    // CategoryTable
    const [refreshKey, setRefreshKey] = useState(true);

    function refreshCategories() {
        setRefreshKey(!refreshKey);
    }

    // AddCategory
    function handleCategoryAdded() {
        setRefreshKey(!refreshKey);
    }

    return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 p-6">

        {/* Header */}
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Categories</h1>

            <div className="flex gap-2">
                <AddCategory onCategoryAdded={handleCategoryAdded} />

                <Button onClick={refreshCategories}>
                    Refresh
                </Button>
            </div>            
        </div>

        {/* Categories Table */}
        <CategoryTable refreshKey={refreshKey} />

        {/* Get Category */}
        <GetCategoryById />
        
    </div>
    )
}