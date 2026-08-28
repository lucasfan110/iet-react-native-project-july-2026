import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedMainScreen } from "../Screens/FeedMainScreen";
import { FeedDetailScreen } from "../Screens/FeedDetailScreen";
import { FeedStackParamList } from "../Types/FeedStackParamList";
import { LocationsStackParamList } from "../Types/LocationsStackParamList";
import { LocationsMainScreen } from "../Screens/LocationsMainScreen";
import { LocationsDetailScreen } from "../Screens/LocationsDetailScreen";

const Stack = createNativeStackNavigator<LocationsStackParamList>();

export function LocationsStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={LocationsMainScreen}
                options={{ title: "Locations" }}
            />
            <Stack.Screen
                name="Detail"
                component={LocationsDetailScreen}
                options={{ title: "Detail" }}
            />
        </Stack.Navigator>
    );
}
