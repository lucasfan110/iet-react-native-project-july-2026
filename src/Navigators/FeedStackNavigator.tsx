import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedMainScreen } from "../Screens/FeedMainScreen";
import { FeedDetailScreen } from "../Screens/FeedDetailScreen";
import { FeedStackParamList } from "../Types/FeedStackParamList";

const Stack = createNativeStackNavigator<FeedStackParamList>();

export function FeedStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={FeedMainScreen}
                options={{ title: "Home" }}
            />
            <Stack.Screen
                name="Detail"
                component={FeedDetailScreen}
                options={{ title: "Detail" }}
            />
        </Stack.Navigator>
    );
}
