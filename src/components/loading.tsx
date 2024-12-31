import React from "react";
import { ActivityIndicator, StatusBar } from "react-native";

export function Loading() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ActivityIndicator
        className="flex-1 bg-green-400 items-center justify-center text-orange"
        size={"large"}
      />
    </>
  );
}
