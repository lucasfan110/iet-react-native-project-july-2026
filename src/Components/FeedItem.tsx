import AntDesign from "@react-native-vector-icons/ant-design";
import he from "he";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../Theme/commonStyles";
import { Feed } from "../Types/Feed";

interface Props {
    feed: Feed;
    onPress?: () => void;
    isEvent?: boolean;
}

export function FeedItem({ feed, onPress, isEvent = false }: Props) {
    const publishedDate = new Date(feed.published).toLocaleDateString();

    return (
        <Pressable onPress={onPress}>
            <View style={styles.feedContainer}>
                <View style={styles.feed}>
                    <View style={styles.feedContent}>
                        <Text style={commonStyles.title}>
                            {isEvent && (
                                <Text>
                                    <AntDesign
                                        name="calendar"
                                        color="black"
                                        size={20}
                                    />
                                    &nbsp;
                                </Text>
                            )}
                            {he.decode(feed.title)}
                        </Text>
                        <Text>
                            {he.decode(feed.actor.displayName)} ({publishedDate}
                            )
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.arrowText}>
                        <AntDesign name="arrow-right" color="black" />
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    feedContainer: {
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    feed: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        // marginHorizontal: 20,
        justifyContent: "space-between",
    },
    feedContent: {
        width: "100%",
    },
    arrowText: {
        textAlign: "right",
    },
});
