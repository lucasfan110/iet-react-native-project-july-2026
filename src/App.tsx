import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import MainScreen from "./Screens/MainScreen";

const queryClient = new QueryClient();

const RootStack = createNativeStackNavigator({
    initialRouteName: "Main",
    screens: {
        Main: MainScreen,
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Navigation />
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({});
