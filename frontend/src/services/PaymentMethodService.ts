import api from "./api";

export const getPaymentMethodApi = async () => {
    const response = await api.get("/payment-methods");
    return response.data;
}