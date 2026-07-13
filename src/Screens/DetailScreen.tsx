import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../Types/RootStackParamList";
import { ScreenProps } from "react-native-screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFeedData } from "../Hooks/useFeedData";
import { commonStyles } from "../Theme/commonStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export function DetailScreen({ route }: Props) {
    const { feedId } = route.params;
    const { data } = useFeedData();

    const specificData = data?.find(d => d._id === feedId);

    if (!specificData) {
        return (
            <View>
                <Text>Failed to load the details for this AggieFeed!</Text>
            </View>
        );
    }

    const publishedDate = new Date(specificData.published);

    return (
        <View>
            <Text style={commonStyles.title}>{specificData.title}</Text>
            <Text>Author: {specificData.actor.displayName}</Text>
            <Text>Type: {specificData.object.objectType}</Text>
            <Text>Published On: {publishedDate.toLocaleString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
