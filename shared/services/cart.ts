import { APIRoutes } from './constants';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';
import { http } from './http-instance';

export const getCart = async (): Promise<CartDTO> => {
    return (await http.get<CartDTO>(APIRoutes.CART)).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    return (await http.patch<CartDTO>(`${APIRoutes.CART}/${itemId}`, { quantity })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await http.delete<CartDTO>(`${APIRoutes.CART}/${id}`)).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await http.post<CartDTO>(`${APIRoutes.CART}/`, values)).data;
};