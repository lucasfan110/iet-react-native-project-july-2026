import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FeedItem } from "../Components/FeedItem";
import { Spinner } from "../Components/Spinner";
import { useFeedData } from "../Hooks/useFeedData";
import { Feed } from "../Types/Feed";
import { FeedStackParamList } from "../Types/FeedStackParamList";
import { AGGIE_BLUE, commonStyles } from "../Theme/commonStyles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type FeedMainScreenNavigationProp = NativeStackNavigationProp<
    FeedStackParamList,
    "Main"
>;

export function FeedMainScreen() {
    const navigation = useNavigation<FeedMainScreenNavigationProp>();
    const { data, isPending, error } = useFeedData();
    const tabBarHeight = useBottomTabBarHeight();

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
            <View style={commonStyles.whiteBackground}>
                <Text style={commonStyles.errorText}>
                    Failed to load AggieFeed (Error: {error?.message})
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.page}>
            {isPending ? (
                <Spinner />
            ) : (
                <View>
                    <Text style={[commonStyles.h2, styles.heading]}>
                        AggieFeed
                    </Text>

                    <FlatList
                        data={data ?? []}
                        keyExtractor={data => data._id}
                        renderItem={data => renderFeed(data.item)}
                        contentContainerStyle={[
                            styles.feedList,
                            // { paddingBottom: tabBarHeight },
                        ]}
                        ListEmptyComponent={
                            <Text>There are no AggieFeed right now!</Text>
                        }
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    feedList: {
        width: "100%",
        paddingBottom: 300,
        paddingTop: 40,
        backgroundColor: "white",
    },
    heading: {
        paddingTop: 50,
        paddingBottom: 20,
        color: "white",
    },
    page: {
        backgroundColor: AGGIE_BLUE,
    },
});
