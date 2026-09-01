import AntDesign from "@react-native-vector-icons/ant-design";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../Theme/commonStyles";
import { LocationData } from "../Types/Locations";

interface Props {
    location: LocationData;
    onPress?: () => void;
}

export function LocationItem({ location, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            // style={({ pressed }) => [
            //     styles.pressableContainer,
            //     pressed && styles.locationPressed,
            // ]}
        >
            <View style={[styles.locationContainer]}>
                <View style={styles.location}>
                    <View style={styles.locationContent}>
                        <Text style={styles.name}>{location.name}</Text>
                    </View>
                    <View>
                        <Text>
                            <AntDesign name="environment" color="black" />
                        </Text>
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
        justifyContent: "space-between",
    },
    locationContent: {
        width: "80%",
    },
    name: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#1A1A1F",
    },
});

// import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// import { LocationData } from "../Types/Locations";
// import AntDesign from "@react-native-vector-icons/ant-design";

// interface Props {
//     location: LocationData;
//     onPress?: () => void;
// }

// function getInitials(location: LocationData) {
//     const source = location.abbr?.trim() || location.name?.trim() || "?";
//     const letters = source
//         .replace(/[^a-zA-Z0-9 ]/g, "")
//         .split(/\s+/)
//         .filter(Boolean)
//         .map(word => word[0])
//         .join("");

//     return (letters || source[0]).slice(0, 3).toUpperCase();
// }

// function formatCoord(value: string) {
//     const parsed = Number(value);
//     return Number.isFinite(parsed) ? parsed.toFixed(4) : value;
// }

// export function LocationItem({ location, onPress }: Props) {
//     // const hasCoords = !!location.lat && !!location.lng;

//     return (
//         <Pressable
//             onPress={onPress}
//             style={({ pressed }) => [
//                 styles.card,
//                 pressed && styles.cardPressed,
//             ]}
//         >
//             {/* {location.image ? (
//                 <Image source={{ uri: location.image }} style={styles.avatar} />
//             ) : (
//                 <View style={[styles.avatar, styles.avatarFallback]}>
//                     <Text style={styles.avatarText}>
//                         {getInitials(location)}
//                     </Text>
//                 </View>
//             )} */}

//             <View style={styles.content}>
//                 <Text style={styles.name} numberOfLines={1}>
//                     {location.name}
//                 </Text>
//                 {/* {hasCoords && (
//                     <Text style={styles.meta} numberOfLines={1}>
//                         {formatCoord(location.lat)}, {formatCoord(location.lng)}
//                     </Text>
//                 )} */}
//             </View>

//             <AntDesign name="right" color="#B0B0B8" size={16} />
//         </Pressable>
//     );
// }

// const styles = StyleSheet.create({
//     card: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 14,
//         backgroundColor: "#fff",
//         borderRadius: 14,
//         borderWidth: 1,
//         borderColor: "#ECECEF",
//         paddingVertical: 14,
//         paddingHorizontal: 16,
//         marginHorizontal: 16,
//         marginBottom: 10,
//     },
//     cardPressed: {
//         backgroundColor: "#F2F2F5",
//     },
//     avatar: {
//         width: 44,
//         height: 44,
//         borderRadius: 12,
//     },
//     avatarFallback: {
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#EEF2FB",
//     },
//     avatarText: {
//         fontSize: 14,
//         fontWeight: "700",
//         color: "#3A5BA0",
//     },
//     content: {
//         flex: 1,
//     },
//     name: {
//         fontSize: 16,
//         fontWeight: "600",
//         color: "#1A1A1F",
//     },
//     meta: {
//         fontSize: 13,
//         color: "#8A8A93",
//         marginTop: 2,
//     },
// });
