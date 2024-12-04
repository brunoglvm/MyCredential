import { StatusBar } from "react-native";
import { Slot } from "expo-router";
import { Loading } from "@/components/loading";
import "@/styles/global.css";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { colors } from "@/styles/colors";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.green[400]}
        translucent
      />
      <Slot />
    </>
  );
}
