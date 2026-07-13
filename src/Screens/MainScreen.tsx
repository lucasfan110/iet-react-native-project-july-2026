import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FeedItem } from "../Components/FeedItem";
import { Spinner } from "../Components/Spinner";
import { useFeedData } from "../Hooks/useFeedData";
import { Feed } from "../Types/Feed";
import { RootStackParamList } from "../Types/RootStackParamList";

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
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    feedList: {
        marginHorizontal: 10,
    },
    errorText: {
        color: "red",
    },
});
