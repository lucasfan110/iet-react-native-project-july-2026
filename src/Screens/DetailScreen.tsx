import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { RootStackParamList } from "../Types/RootStackParamList";
import { ScreenProps } from "react-native-screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFeedData } from "../Hooks/useFeedData";
import { commonStyles } from "../Theme/commonStyles";
import he from "he";
import AntDesign from "@react-native-vector-icons/ant-design";
import { UrlLink } from "../Components/UrlLink";
import RenderHTML from "react-native-render-html";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export function DetailScreen({ route }: Props) {
    const { feedId } = route.params;
    const { data } = useFeedData();
    const { width } = useWindowDimensions();

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
        <View style={styles.detailContainer}>
            <Text style={commonStyles.title}>
                {he.decode(specificData.title)}
            </Text>
            <View style={styles.infoRow}>
                <View style={styles.textWithIcon}>
                    <AntDesign name="user" color="black" size={20} />
                    <View style={styles.authorNameContainer}>
                        <Text>{he.decode(specificData.actor.displayName)}</Text>
                    </View>
                </View>
                <Text>{he.decode(specificData.object.objectType)}</Text>
            </View>
            <View style={styles.textWithIcon}>
                <AntDesign name="edit" color="black" size={20} />
                <Text>&nbsp;{publishedDate.toLocaleString()}</Text>
            </View>

            <RenderHTML
                contentWidth={width}
                source={{ html: specificData.object.content }}
                tagsStyles={{
                    a: commonStyles.link,
                }}
            />

            <UrlLink
                displayText={he.decode(
                    specificData.object.ucdEdusModel.urlDisplayName,
                )}
                href={specificData.object.ucdEdusModel.url}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    detailContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        gap: 10,
    },
    infoRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textWithIcon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    authorNameContainer: {
        maxWidth: "70%",
    },
});
