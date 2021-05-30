import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HoldMenuProvider } from "react-native-hold-menu";
import FeatherIcon from "react-native-vector-icons/Feather";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <HoldMenuProvider iconComponent={FeatherIcon} theme="light">
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </HoldMenuProvider>
    );
  }
}
