import AntDesign from "@react-native-vector-icons/ant-design";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../Theme/commonStyles";
import { LocationData } from "../Types/Locations";
import { PartiallyBoldText, StartStopIndex } from "./PartiallyBoldText";

interface Props {
    location: LocationData;
    onPress?: () => void;
    /**
     * **Must be in order, from smallest to largest!**
     */
    boldOn?: StartStopIndex[];
}

export function LocationItem({ location, onPress, boldOn }: Props) {
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.locationContainer]}>
                <View style={styles.location}>
                    <View style={styles.icon}>
                        <AntDesign name="environment" color="black" size={20} />
                    </View>
                    <View style={styles.locationContent}>
                        <PartiallyBoldText
                            boldOn={boldOn}
                            text={location.name}
                            style={styles.name}
                        />
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
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        gap: 10,
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
    icon: {
        backgroundColor: "#CCC",
        padding: 10,
        borderRadius: "50%",
    },
});
