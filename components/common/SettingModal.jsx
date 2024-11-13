import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const SettingModal = ({ status, onClose }) => {
  const [modalVisible, setModalVisible] = useState(status);

  useEffect(() => {
    setModalVisible(status);
  }, [status]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setModalVisible(false);
        onClose();
      };
    }, [onClose])
  );

  return (
    // <Modal
    //   transparent={true}
    //   visible={modalVisible}
    //   onRequestClose={onClose}
    //   animationType="fade"
    // >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <Text>Hello, I am a modal!</Text>
            <Button onPress={onClose}>Hide Modal</Button>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
    // </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 45,
    left: 10,
    width: 200,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SettingModal;
