import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { toggleItem, deleteItem, editItem } from "../redux/actions";

const ShoppingItem = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedName.trim()) {
      dispatch(editItem(item.id, editedName));
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.item}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedName}
          onChangeText={setEditedName}
        />
      ) : (
        <Text
          style={[
            styles.text,
            item.purchased && { textDecorationLine: "line-through" },
          ]}
        >
          {item.name}
        </Text>
      )}
      <Button title="Toggle" onPress={() => dispatch(toggleItem(item.id))} />
      <Button title="Delete" onPress={() => dispatch(deleteItem(item.id))} />
      {isEditing ? (
        <Button title="Save" onPress={handleEdit} />
      ) : (
        <Button title="Edit" onPress={() => setIsEditing(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  text: { flex: 1 },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
    paddingHorizontal: 5,
  },
});

export default ShoppingItem;
