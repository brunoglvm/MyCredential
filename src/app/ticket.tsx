import {
  Text,
  View,
  Alert,
  Share,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MotiView } from "moti";
import { FontAwesome } from "@expo/vector-icons";
import * as imagePicker from "expo-image-picker";
import { Redirect } from "expo-router";

import { useBadgeStore } from "@/store/badge-store";

import { colors } from "@/styles/colors";

import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { Credential } from "@/components/credential";

export default function Ticket() {
  const badgeStore = useBadgeStore();

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        });
      } else {
        Alert.alert("Share", "Invalid check-in URL.");
      }
    } catch (error) {
      console.log("Error sharing:", error);
      Alert.alert("Share", "Unable to share.");
    }
  }

  async function handleSelectImage() {
    try {
      const result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets && result.assets.length > 0) {
        badgeStore.updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Photo", "Unable to select image.");
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 bg-green-400">
      <StatusBar backgroundColor={colors.green[500]} />
      <Header title="My Credential" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 32,
          paddingBottom: 32,
        }}
      >
        <Credential data={badgeStore.data} onChangeAvatar={handleSelectImage} />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 8,
          }}
          transition={{
            loop: true,
            duration: 600,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[200]}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-gray-100 font-bold text-2xl mt-4">
          Share Credential
        </Text>

        <Text className="text-gray-200 font-regular text-base mt-1 mb-6">
          Step up and show the world you're part of this!
        </Text>

        <Button title="Share" onPress={handleShare} />

        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginTop: 40 }}
          onPress={() => badgeStore.remove()}
        >
          <Text className="text-white text-base font-bold text-center">
            Remove Ticket
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
