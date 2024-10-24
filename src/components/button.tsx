import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors } from "@/styles/colors";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

const buttonStyle = StyleSheet.create({
  button: {
    width: "100%",
    height: 56,
    backgroundColor: colors.green[300],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      style={buttonStyle.button}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className="text-black" />
      ) : (
        <Text className="text-black text-base font-bold uppercase">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
