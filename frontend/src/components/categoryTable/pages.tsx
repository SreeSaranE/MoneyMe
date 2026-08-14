import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type categoryType = {
    categoryId: number,
    categoryName: string
}

import {
    getCategories,
    getCatgoryById,
    addCategory
} from "@/services/CategoryService"

function Pages() {
    const [categories, setCategories] = useState<categoryType[]>([]);

    useEffect(() => {
        loadCategory();
    }, []);

    async function loadCategory() {
        const data = await getCategories();
        setCategories(data);
        console.log("Data refreshed");
    }

    return (
        <Table>
            <TableCaption>A list of your categories.</TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Category</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {categories.map((item, index) => (
                    <TableRow key={item.categoryId}>
                        <TableCell className="font-medium">
                            {item.categoryId}
                        </TableCell>

                        <TableCell>
                            {item.categoryName}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default Pages;