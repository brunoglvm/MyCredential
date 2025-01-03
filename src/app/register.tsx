import { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import axios from "axios";

import { api } from "@/services/api";
import { useBadgeStore } from "@/store/badge-store";

import Logo from "@/assets/images/logo.svg";
import { colors } from "@/styles/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert("Registration", "Please fill in all fields!");
      }

      setIsLoading(true);

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      if (registerResponse.data.attendeeId) {
        const badgeResponse = await api.get(
          `/attendees/${registerResponse.data.attendeeId}/badge`
        );

        badgeStore.save(badgeResponse.data.badge);

        Alert.alert("Registration", "Registration successful!", [
          { text: "OK", onPress: () => router.push("/ticket") },
        ]);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes("already registered")
        ) {
          return Alert.alert(
            "Registration",
            "This email is already registered!"
          );
        }
      }

      Alert.alert("Registration", "Could not complete the registration");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-green-400 items-center justify-center p-8">
        <Logo width={212} height={38} />

        <View className="w-full mt-12 gap-3">
          <Input>
            <FontAwesome6
              name="user-circle"
              color={colors.green[200]}
              size={20}
            />
            <Input.Field placeholder="Full name" onChangeText={setName} />
          </Input>

          <Input>
            <MaterialIcons
              name="alternate-email"
              color={colors.green[200]}
              size={20}
            />
            <Input.Field
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </Input>

          <Button
            title="Register"
            onPress={handleRegister}
            isLoading={isLoading}
          />

          <Link
            href="/"
            className="text-white text-base text-center font-bold mt-8"
          >
            Already have a ticket?
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
