import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { DetailScreen } from "./Screens/DetailScreen";
import { MainScreen } from "./Screens/MainScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

const RootStack = createNativeStackNavigator({
    initialRouteName: "Main",
    screens: {
        Main: {
            screen: MainScreen,
            options: {
                title: "Home",
            },
        },
        Detail: {
            screen: DetailScreen,
        },
    },
});

const Navigation = createStaticNavigation(RootStack);

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Navigation />
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({});
