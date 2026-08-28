import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedMainScreen } from "../Screens/FeedMainScreen";
import { FeedDetailScreen } from "../Screens/FeedDetailScreen";
import { FeedStackParamList } from "../Types/FeedStackParamList";
import { Text } from "react-native";
import { commonStyles } from "../Theme/commonStyles";

const Stack = createNativeStackNavigator<FeedStackParamList>();

export function FeedStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="Main"
                component={FeedMainScreen}
                options={
                    {
                        // headerTitle: () => (
                        //     <Text style={commonStyles.h2}>AggieFeed</Text>
                        // ),
                    }
                }
            />
            <Stack.Screen
                name="Detail"
                component={FeedDetailScreen}
                options={{ title: "Detail" }}
            />
        </Stack.Navigator>
    );
}
