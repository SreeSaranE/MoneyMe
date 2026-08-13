
import { useState, useEffect } from "react";
import {
    getCategories,
    getCatgoryById,
    addCategory
} from "../../services/CategoryService";



type categoryType = {
    categoryId: number,
    categoryName: string
}


export default function CategoryPage() {

    const [ category, setCategory ] = useState({
        categoryId: null,
        categoryName: ""
    });

    const [ categories, setCategories ] = useState([]);
    const [ newCategory, setNewCategory ] = useState("");

    useEffect(() => { loadCategory() }, [])

    async function loadCategory() {
        const data = await getCategories();
        setCategories(data);
        console.log("Data refreshed");
    }

    async function getcate(categoryId: number) {
        const data = await getCatgoryById(categoryId);
        setCategory(data);

    }

    async function addCate() {
        await addCategory(newCategory);
        loadCategory();
    }
    
    return<>
    <div className="categoryContent">
        <p>Categories</p>

        <div className="refreshCategory">
            <button onClick={loadCategory}>Refresh</button>
        </div>

        <div className="listAllCategories">
            {categories.map((item: categoryType) => (
                <div key={item.categoryId}>
                    {item.categoryName}
                </div>
            ))}
        </div>
        
        <div className="getCategory">
            <input
                type="number"
                min={1}
                max={categories.length}
                onChange={(e) => getcate(Number(e.target.value))}
            />

            <p>{category.categoryId} - {category.categoryName}</p>
        </div>

        <div className="addCategory">
            <input
                type="text"
                placeholder="category"
                value={newCategory}
                onChange={(e) => (setNewCategory(e.target.value))}
            />
            <button onClick={addCate}>add Category</button>
            <p>{newCategory}</p>
        </div>
    </div>
    </>
}