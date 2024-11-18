import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setAuthOpen } from "../../redux/features/AuthSlice";

export default function SettingModal({ status = false, onClose }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(status);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsOpen(status);
  }, [status]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        dispatch(setAuthOpen(true));
        // Thực hiện các hành động khác sau khi đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
        onClose();
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>Cài đặt tài khoản</Text>
              <IconButton
                icon="close"
                size={20}
                onPress={handleClose}
                style={styles.iconButton}
              />
            </View>

            {/* Options */}
            <View style={styles.content}>
              <View style={styles.option}>
                <View style={styles.optionRow}>
                  <Text style={styles.optionText}>Giao diện tối</Text>
                </View>
                <Switch
                  value={isDarkMode}
                  style={styles.switch}
                  onValueChange={setIsDarkMode}
                />
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cài đặt thông báo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Quy tắc cộng đồng</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Quyền riêng tư</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Thông tin phiên bản</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.deleteButton]}>
                <Text style={[styles.buttonText, styles.deleteText]}>
                  Xóa tài khoản
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Button
                mode="contained"
                onPress={handleLogout}
                style={styles.logoutButton}
                buttonColor="#DC2626"
                textColor="#FFFFFF"
              >
                Đăng xuất
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "90%",
    maxHeight: "90%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  iconButton: {
    padding: 0,
  },
  content: {
    padding: 16,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    // marginLeft: 8,
    color: "#374151",
  },
  button: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  buttonText: {
    fontSize: 14,
    color: "#374151",
  },
  deleteButton: {
    marginTop: 8,
  },
  deleteText: {
    color: "#DC2626",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  logoutButton: {
    borderRadius: 8,
  },
});
