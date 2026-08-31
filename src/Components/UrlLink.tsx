import {
    Linking,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
} from "react-native";
import { commonStyles } from "../Theme/commonStyles";
import React from "react";

interface Props {
    children?: React.ReactNode;
    href: string;
    style?: StyleProp<TextStyle>;
}

async function openUrl(url: string) {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);
    } else {
        alert("Cannot open this URL!");
    }
}

export function UrlLink({ children, href, style }: Props) {
    let displayContent: React.ReactNode;
    if (!children) {
        displayContent = href;
    } else {
        displayContent = children;
    }

    return (
        <Pressable onPress={() => openUrl(href)}>
            <Text style={[commonStyles.link, style]}>{displayContent}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({});
