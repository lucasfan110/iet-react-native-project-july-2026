import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FeedItem } from "../Components/FeedItem";
import { Spinner } from "../Components/Spinner";
import { useFeedData } from "../Hooks/useFeedData";
import { Feed } from "../Types/Feed";
import { RootStackParamList } from "../Types/RootStackParamList";
import { SafeAreaView } from "react-native-safe-area-context";

type MainScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Main"
>;

export function MainScreen() {
    const navigation = useNavigation<MainScreenNavigationProp>();
    const { data, isPending, error } = useFeedData();

    function renderFeed(feed: Feed) {
        return (
            <FeedItem
                feed={feed}
                onPress={() =>
                    navigation.navigate("Detail", { feedId: feed._id })
                }
                isEvent={feed.object.objectType === "event"}
            />
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>
                    Failed to load AggieFeed (Error: {error?.message})
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {isPending ? (
                <Spinner />
            ) : (
                <FlatList
                    ListHeaderComponent={
                        <Text style={styles.heading}>AggieFeed</Text>
                    }
                    data={data ?? []}
                    keyExtractor={data => data._id}
                    renderItem={data => renderFeed(data.item)}
                    style={styles.feedList}
                    ListEmptyComponent={
                        <Text>There are no AggieFeed right now!</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    feedList: {
        width: "100%",
        paddingBottom: 100,
    },
    errorText: {
        color: "red",
    },
    heading: {
        marginVertical: 20,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
});
