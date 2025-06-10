import { account } from "@/appwriteConfig";
import { SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useUserStore } from "@/components/userData";
export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    checkUserSession();
  }, []);
  const checkUserSession = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      const user = await account.get();

      //Store user id using zustand

      setUser({
        id: user.$id,
        name: user.name,
      });
      console.log("User is logged in:", user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("No user session found");
      setIsLoggedIn(false);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (isLoggedIn !== null) {
      await SplashScreen.hideAsync();
    }
  }, [isLoggedIn]);

  if (isLoggedIn == null) {
    return null;
  }
  return (
    <>
      <Stack onLayout={onLayoutRootView} screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
      </Stack>
      <Toast />
    </>
  );
}
