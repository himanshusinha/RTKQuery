import { View, Text, FlatList, TextInput, Button } from 'react-native';
import React, { FC } from 'react';
import {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
} from '../services/GetApiCallServices';
import { Product } from '../types';

const ApiDemoScreen: FC = () => {
  // Fetch single product by ID
  const { data, error, isLoading } = useGetProductByIdQuery(1);

  // Fetch all products (commented out for now)
  // const { data: products, error: productsError, isLoading: productsLoading } = useGetProductsQuery();

  // Mutation hook to add a product
  const [addProduct, { isLoading: isAdding, error: addError }] =
    useAddProductMutation();
  const [deleteProduct, { isLoading: isDeleting, error: deleteError }] =
    useDeleteProductMutation();
  const [title, setTitle] = React.useState('');
  const [addedProduct, setAddedProduct] = React.useState<Product | null>(null);

  if (isLoading) return <Text>Loading...</Text>;
  if (error || !data) return <Text>Error occurred</Text>;

  const handleAdd = async () => {
    try {
      const newProduct = await addProduct({
        title,
        price: 10,
        description: 'New product',
        category: 'electronics',
        image: 'https://i.pravatar.cc',
      }).unwrap();
      setAddedProduct(newProduct);
      setTitle('');
    } catch (err) {
      console.log('Error:', err);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const deleted = await deleteProduct(id).unwrap();
      console.log('Deleted:', deleted);
      // Optionally: clear addedProduct or show a message
      setAddedProduct(null);
    } catch (err) {
      console.log('Error deleting:', err);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {/* Display fetched single product */}
      <Text style={{ fontWeight: 'bold' }}>Fetched Product:</Text>
      <Text>Title: {data.title}</Text>
      <Text>Price: {data.price}</Text>
      <Text>Description: {data.description}</Text>

      {/* Input to add a new product */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="New product title"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginVertical: 12,
        }}
      />

      <Button
        title={isAdding ? 'Adding...' : 'Add Product'}
        onPress={handleAdd}
        disabled={isAdding || !title}
      />

      {addError && (
        <Text style={{ color: 'red', marginTop: 8 }}>Error adding product</Text>
      )}

      {addedProduct && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>Added Product:</Text>
          <Text>Title: {addedProduct?.title}</Text>
          <Text>Price: {addedProduct?.price}</Text>
          <Text>Description: {addedProduct?.description}</Text>
        </View>
      )}

      {/* Uncomment below to display all products in a FlatList */}
      {/*
      {productsLoading && <Text>Loading products...</Text>}
      {productsError && <Text>Error loading products</Text>}
      {products && (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 4 }}>
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
          )}
        />
      )}
      */}

      <Button
        title={isDeleting ? 'Deleting...' : 'Delete Product'}
        onPress={() => handleDelete(data.id)}
        disabled={isDeleting} // ✅ disable while deleting
      />
    </View>
  );
};

export default ApiDemoScreen;
