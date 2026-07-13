import he from "he";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feed } from "../Types/Feed";
import { commonStyles } from "../Theme/commonStyles";

interface Props {
    feed: Feed;
    onPress: () => void;
}

export function FeedItem({ feed, onPress }: Props) {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.feed}>
                <Text style={commonStyles.title}>{he.decode(feed.title)}</Text>
                <Text>{he.decode(feed.actor.displayName)}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    feed: {
        marginBottom: 20,
    },
});
