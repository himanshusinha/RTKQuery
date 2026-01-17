import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types';
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({ query: () => 'products' }),

    // Product by ID
    getProductById: builder.query<Product, number>({
      query: id => `products/${id}`,
    }),

    addProduct: builder.mutation<Product, Partial<Product>>({
      query: body => ({
        url: 'products',
        method: 'POST',
        body, // object with fields like title, price, description, category, image
      }),
    }),
    deleteProduct: builder.mutation<Product, number>({
      query: id => ({
        url: `products/${id}`, // send ID in URL
        method: 'DELETE',
      }),
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productApi;
