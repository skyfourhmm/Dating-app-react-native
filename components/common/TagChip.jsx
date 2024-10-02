import { Chip } from "react-native-paper";

export default function TagChip({ label, bgColor, color, icon }) {
  return (
    <Chip
      icon={icon}
      elevated
      onPress={() => {}}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        marginTop: 8,
        alignSelf: "flex-start",
      }}
      selectedColor={color}
    >
      {label}
    </Chip>
  );
}
