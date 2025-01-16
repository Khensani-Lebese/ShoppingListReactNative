import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { toggleItem, deleteItem } from "../redux/actions";

const ShoppingItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.item}>
      <Text
        style={[
          styles.text,
          item.purchased && { textDecorationLine: "line-through" },
        ]}
      >
        {item.name}
      </Text>
      <Button title="Toggle" onPress={() => dispatch(toggleItem(item.id))} />
      <Button title="Delete" onPress={() => dispatch(deleteItem(item.id))} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  text: { flex: 1 },
});

export default ShoppingItem;
