import React from "react";
import { TextInput, View, TextInputProps, Platform } from "react-native";
import { colors } from "@/styles/colors";

function Input({ children }: { children: React.ReactNode }) {
  const paddingVertical = Platform.OS === "ios" ? "py-[18px]" : "py-[6px]";

  return (
    <View
      className={`w-full flex-row items-center gap-2 px-3 ${paddingVertical} border border-gray-100 rounded-lg`}
    >
      {children}
    </View>
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-gray-100 font-regular"
      placeholderTextColor={colors.gray[200]}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };
