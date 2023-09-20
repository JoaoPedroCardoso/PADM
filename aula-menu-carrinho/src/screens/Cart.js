import { Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ProductCart } from "../components/ProductOnCart.js";
import { numberFormat } from "../services/numberFormat";

export const Cart = ({navigation, items, getTotalPrice}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(items);
  });

  const clearCart = () => {
    setProducts(products.splice(0, products.length))
  }

  const renderProduct = ({ item: product }) => {
    return (
      <ProductCart
        name={product.product.name}
        price={product.product.price}
        image={product.product.image}
        qtd={product.qty}
        onPress={() => {
          navigation.navigate("ProductDetails", {
            productId: product.id,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.view}>
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={products}
      renderItem={renderProduct}
    />
    <Text style={styles.total}>Valor total: R$ {numberFormat(getTotalPrice())}</Text>
    <Pressable onPress={clearCart}>
          <Text style={styles.buttonAdicionar}>
            Limpar carrinho
          </Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: "#eee",
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  view: {
    flex: 1, marginBottom: 15
  },
  total: {
    fontSize: 18,
    padding: 15,
    fontWeight: "600",
  },
  buttonAdicionar: {
    padding: 10,
    width: '100%',
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'black',
    borderRadius:50
  }
});