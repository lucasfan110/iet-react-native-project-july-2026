import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LocationsStackParamList } from "../Types/LocationsStackParamList";
import MapView, { MapMarker, PROVIDER_GOOGLE } from "react-native-maps";
import { AGGIE_BLUE, commonStyles } from "../Theme/commonStyles";
import AntDesign from "@react-native-vector-icons/ant-design";
import { UrlLink } from "../Components/UrlLink";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<LocationsStackParamList, "Detail">;
type LocationsDetailScreenNavigationProp = NativeStackNavigationProp<
    LocationsStackParamList,
    "Detail"
>;

export function LocationsDetailScreen({ route }: Props) {
    const { name, lat, lng, link } = route.params;
    const navigation = useNavigation<LocationsDetailScreenNavigationProp>();

    let latNum: number, lngNum: number;

    try {
        latNum = Number(lat);
        lngNum = Number(lng);
    } catch {
        return (
            <Text style={commonStyles.errorText}>
                Failed to load the map. Please contact assistance.
            </Text>
        );
    }

    function onBackButtonPress() {
        navigation.pop();
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Pressable
                    style={styles.backButton}
                    onPress={onBackButtonPress}
                >
                    <AntDesign name="arrow-left" size={20} color="white" />
                </Pressable>
                <Text style={[commonStyles.title, styles.mapTitle]}>
                    {name}
                </Text>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.mapView}
                    initialRegion={{
                        latitude: latNum,
                        longitude: lngNum,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <MapMarker
                        coordinate={{ latitude: latNum, longitude: lngNum }}
                        titleVisibility="visible"
                        title={name}
                    />
                </MapView>
            </View>
            <View style={[styles.websiteDisplay /*, commonStyles.debug*/]}>
                <AntDesign
                    name="compass"
                    size={25}
                    color="black"
                    // style={commonStyles.debug}
                />
                {link ? (
                    <UrlLink
                        href={link}
                        style={[styles.websiteText /*, commonStyles.debug*/]}
                    />
                ) : (
                    <Text style={[styles.websiteText]}>
                        No website available
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {},
    mapTitle: {
        textAlign: "center",
        paddingHorizontal: 10,
        color: "white",
        marginBottom: 20,
    },
    mapContainer: {
        height: 400,
    },
    mapView: {
        flex: 1,
    },
    websiteDisplay: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    websiteText: {
        fontSize: 16,
    },
    headerContainer: {
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: AGGIE_BLUE,
    },
    backButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
});
