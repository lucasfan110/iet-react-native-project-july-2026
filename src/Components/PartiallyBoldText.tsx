import { useMemo } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { commonStyles } from "../Theme/commonStyles";

export interface StartStopIndex {
    start: number;
    stop: number;
}

interface Props {
    /**
     * **Must be in order, from smallest to largest!**
     */
    boldOn?: StartStopIndex[];
    text: string;
    style?: StyleProp<TextStyle>;
}

export function PartiallyBoldText({ boldOn, text, style }: Props) {
    const textSegments = useMemo(() => {
        const segments: { text: string; bold: boolean }[] = [];

        if (boldOn && boldOn.length > 0) {
            let lastCutIndex = 0;

            for (const boldRange of boldOn) {
                segments.push({
                    text: text.slice(lastCutIndex, boldRange.start),
                    bold: false,
                });
                segments.push({
                    text: text.slice(boldRange.start, boldRange.stop),
                    bold: true,
                });

                lastCutIndex = boldRange.stop;
            }

            segments.push({
                text: text.slice(lastCutIndex),
                bold: false,
            });
        } else {
            segments.push({ text, bold: false });
        }

        return segments;
    }, [boldOn, text]);

    return (
        <Text style={styles.text}>
            {textSegments.map((text, index) => (
                <Text
                    style={[style, text.bold && commonStyles.bold]}
                    key={index}
                >
                    {text.text}
                </Text>
            ))}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        flexDirection: "row",
    },
});
