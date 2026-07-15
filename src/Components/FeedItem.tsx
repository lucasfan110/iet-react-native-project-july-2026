import he from "he";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feed } from "../Types/Feed";
import { commonStyles } from "../Theme/commonStyles";
import AntDesign from "@react-native-vector-icons/ant-design";

interface Props {
    feed: Feed;
    onPress: () => void;
    isEvent?: boolean;
}

export function FeedItem({ feed, onPress, isEvent = false }: Props) {
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
                        <Text>{he.decode(feed.actor.displayName)}</Text>
                    </View>
                    <View style={styles.arrow}>
                        <Text>
                            <AntDesign name="arrow-right" color="black" />
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    feedContainer: {
        display: "flex",
        justifyContent: "center",
    },
    feed: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        justifyContent: "space-between",
    },
    feedContent: {
        width: "80%",
    },
    arrow: {},
});
