import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" backgroundColor={Colors.light.background} />
        <Stack
          screenOptions={{
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            headerShadowVisible: false,
            headerTintColor: Colors.light.text,
            headerTitleStyle: {
              fontWeight: '700',
              fontFamily: 'Inter',
            },
            contentStyle: {
              backgroundColor: Colors.light.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="supplement/[id]" 
            options={{ 
              title: "Product Details",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="order/[id]" 
            options={{ 
              title: "Order Details",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="pharmacy/[id]" 
            options={{ 
              title: "Pharmacy Details",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="cart" 
            options={{ 
              title: "Your Cart",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="checkout" 
            options={{ 
              title: "Checkout",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="pharmacy-login" 
            options={{ 
              title: "Pharmacy Login",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="courier-login" 
            options={{ 
              title: "Courier Login",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="addresses" 
            options={{ 
              title: "Delivery Addresses",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="payment" 
            options={{ 
              title: "Payment Methods",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="support" 
            options={{ 
              title: "Help & Support",
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{ 
              title: "Settings",
              presentation: 'card',
            }} 
          />
        </Stack>
      </QueryClientProvider>
    </trpc.Provider>
  );
}