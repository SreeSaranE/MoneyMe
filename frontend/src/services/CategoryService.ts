import api from "./api";

export const getCategories = async () => {
    const response = await api.get("/category");
    return response.data;
}

export const getCatgoryById = async (categoryId: number) => {
    const response = await api.get(`/category/${categoryId}`);
    return response.data;
}

export const addCategory = async (categoryName: string) => {
    var newCategory = {
        CategoryName: categoryName
    }
    const response = await api.post("/category/add", newCategory);
    return response;
}