import { ReactNode } from "react";
import { TextInput, View, TextInputProps } from "react-native";
import { colors } from "@/styles/colors";

function Input({ children }: { children: ReactNode }) {
  return (
    <View className="w-full min-h-14 flex-row items-center gap-3 p-3 border border-gray rounded-lg">
      {children}
    </View>
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-gray-100 text-base font-regular"
      placeholderTextColor={colors.gray[200]}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };
