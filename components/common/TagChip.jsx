import { Chip } from "react-native-paper";

export default function TagChip({ label, bgColor, color, icon }) {
  return (
    <Chip
      icon={icon}
      elevated
      onPress={() => {}}
      style={{
        backgroundColor: bgColor || "#f1f1f1",
        borderRadius: 100,
        marginTop: 8,
        alignSelf: "flex-start",
        marginRight: 8,
      }}
      selectedColor={color || "#000"}
    >
      {label}
    </Chip>
  );
}
