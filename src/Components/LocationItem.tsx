import AntDesign from "@react-native-vector-icons/ant-design";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../Theme/commonStyles";
import { LocationData } from "../Types/Locations";
import { useMemo } from "react";

interface StartStopIndex {
    start: number;
    stop: number;
}

interface Props {
    location: LocationData;
    onPress?: () => void;
    /**
     * **Must be in order, from smallest to largest!**
     */
    boldOn?: StartStopIndex[];
}

export function LocationItem({ location, onPress, boldOn }: Props) {
    const textSegments = useMemo(() => {
        const segments: { text: string; bold: boolean }[] = [];

        if (boldOn && boldOn.length > 0) {
            let lastCutIndex = 0;

            for (const boldRange of boldOn) {
                segments.push({
                    text: location.name.slice(lastCutIndex, boldRange.start),
                    bold: false,
                });
                segments.push({
                    text: location.name.slice(boldRange.start, boldRange.stop),
                    bold: true,
                });

                lastCutIndex = boldRange.stop;
            }

            segments.push({
                text: location.name.slice(lastCutIndex),
                bold: false,
            });
        } else {
            segments.push({ text: location.name, bold: false });
        }

        return segments;
    }, [boldOn, location.name]);

    return (
        <Pressable onPress={onPress}>
            <View style={[styles.locationContainer]}>
                <View style={styles.location}>
                    <View>
                        <Text>
                            <AntDesign
                                name="environment"
                                color="black"
                                size={20}
                            />
                        </Text>
                    </View>
                    <View style={styles.locationContent}>
                        {/* <Text style={styles.name}>{location.name}</Text> */}
                        {textSegments.map((text, index) => (
                            <Text
                                style={[
                                    styles.name,
                                    text.bold && commonStyles.bold,
                                ]}
                                key={index}
                            >
                                {text.text}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    locationContainer: {
        justifyContent: "center",
        backgroundColor: "#FFF",
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#222",
        // marginHorizontal: 20,
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        // justifyContent: "space-between",
        gap: 20,
    },
    locationContent: {
        width: "80%",
        flexDirection: "row",
    },
    name: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#1A1A1F",
    },
});
