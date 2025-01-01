import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ImageBackground,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";

import { BadgeStore } from "@/store/badge-store";

import { colors } from "@/styles/colors";

import { QRCode } from "@/components/qrcode";

type Props = {
  data: BadgeStore;
  image?: string;
  onChangeAvatar?: () => void;
};

export function Credential({ data, onChangeAvatar }: Props) {
  const { height } = useWindowDimensions();

  return (
    <MotiView
      className="w-full self-stretch items-center"
      from={{
        opacity: 0,
        translateY: -height,
        rotateZ: "50deg",
        rotateY: "30deg",
        rotateX: "30deg",
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        rotateZ: "0deg",
        rotateY: "0deg",
        rotateX: "0deg",
      }}
      transition={{
        damping: 20,
        rotateZ: {
          damping: 15,
          mass: 3,
        },
      }}
    >
      <Image
        source={require("@/assets/images/ticket/band.png")}
        className="w-24 h-48 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-12 border border-white/10 mx-3 -mt-6 rounded-2xl">
        <ImageBackground
          source={require("@/assets/images/ticket/header.png")}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-gray-100 text-sm font-bold">
              {data.eventTitle}
            </Text>
            <Text className="text-gray-100 text-sm font-bold">#{data.id}</Text>
          </View>
        </ImageBackground>

        {data.image ? (
          <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
            <Image source={{ uri: data.image }} style={userPhotoStyle} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            style={cameraIconStyle}
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="text-gray-100 font-bold text-2xl mt-4">
          {data.name}
        </Text>

        <Text className="text-gray-200 font-regular text-base mb-4">
          {data.email}
        </Text>

        <QRCode value={data.checkInURL} size={120} />
      </View>
    </MotiView>
  );
}

const userPhotoStyle = {
  width: 128,
  height: 128,
  borderRadius: 64,
  marginTop: -96,
};

const cameraIconStyle: ViewStyle = {
  ...userPhotoStyle,
  backgroundColor: colors.gray[200],
  alignItems: "center",
  justifyContent: "center",
};
