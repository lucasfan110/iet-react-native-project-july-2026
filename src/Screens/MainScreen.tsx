import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FlatList, StyleSheet, Text, View } from "react-native";
import he from "he";
import Spinner from "../Components/Spinner";

interface Feed {
    _id: string;
    title: string;
    actor: {
        displayName: string;
    };
}

function MainScreen() {
    async function fetchAggieFeed() {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const res = await axios.get(
            "https://aggiefeed.ucdavis.edu/api/v1/activity/public?s=0&l=25",
        );

        return res.data;
    }

    const { data, isPending, error, isError } = useQuery<Feed[]>({
        queryKey: ["aggie-feed"],
        queryFn: fetchAggieFeed,
    });

    function renderFeed(feed: Feed) {
        return (
            <View style={styles.feed}>
                <Text style={styles.title}>{he.decode(feed.title)}</Text>
                <Text>{he.decode(feed.actor.displayName)}</Text>
            </View>
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
    feed: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    feedList: {
        marginHorizontal: 10,
    },
    errorText: {
        color: "red",
    },
});

export default MainScreen;
