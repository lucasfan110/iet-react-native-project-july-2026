import { Linking, Pressable, StyleSheet, Text } from "react-native";
import { commonStyles } from "../Theme/commonStyles";

interface Props {
    displayText?: string;
    href: string;
}
async function openUrl(url: string) {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);
    } else {
        alert("Cannot open this URL!");
    }
}

export function UrlLink({ displayText, href }: Props) {
    let displayContent: string;
    if (!displayText) {
        displayContent = href;
    } else {
        displayContent = displayText;
    }

    return (
        <Pressable onPress={() => openUrl(href)}>
            <Text style={commonStyles.link}>{displayContent}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({});
