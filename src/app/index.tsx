import { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";

import { api } from "@/services/api";
import { useBadgeStore } from "@/store/badge-store";

import Logo from "@/assets/images/logo.svg";
import { colors } from "@/styles/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();
  console.log("data =>", badgeStore.data);

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Alert.alert("Ticket", "Please enter the ticket code!");
      }

      setIsLoading(true);

      const { data } = await api.get(`/attendees/${code}/badge`);
      badgeStore.save(data.badge);
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      Alert.alert("Ticket", "Ticket not found!");
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-green-400 items-center justify-center p-8">
        <Logo width={212} height={38} />

        <View className="w-full mt-12 gap-3">
          <Input>
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              color={colors.green[200]}
              size={20}
            />
            <Input.Field placeholder="Ticket code" onChangeText={setCode} />
          </Input>
          <Button
            title="Access credential"
            onPress={handleAccessCredential}
            isLoading={isLoading}
          />

          <Link
            href="/register"
            className="text-white text-base text-center font-bold mt-8"
          >
            Don't have a ticket yet?
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
