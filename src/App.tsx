import {
    createStaticNavigation,
    NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { FeedDetailScreen } from "./Screens/FeedDetailScreen";
import { FeedMainScreen } from "./Screens/FeedMainScreen";
import {
    createBottomTabNavigator,
    createBottomTabScreen,
} from "@react-navigation/bottom-tabs";
import { TabNavigator } from "./Navigators/TabNavigator";

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({});
