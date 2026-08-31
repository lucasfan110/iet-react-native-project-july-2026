import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { LocationsStackParamList } from "../Types/LocationsStackParamList";
import MapView, { MapMarker, PROVIDER_GOOGLE } from "react-native-maps";
import { AGGIE_BLUE, commonStyles } from "../Theme/commonStyles";
import AntDesign from "@react-native-vector-icons/ant-design";
import { UrlLink } from "../Components/UrlLink";

type Props = NativeStackScreenProps<LocationsStackParamList, "Detail">;

export function LocationsDetailScreen({ route }: Props) {
    const { name, lat, lng, link } = route.params;

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

    return (
        <View style={styles.mainContainer}>
            <Text style={[commonStyles.title, styles.mapTitle]}>{name}</Text>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.mapView}
                    initialRegion={{
                        latitude: latNum,
                        longitude: lngNum,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
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
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: AGGIE_BLUE,
        color: "white",
        marginBottom: 20,
    },
    mapContainer: {
        // borderWidth: 5,
        height: 400,
    },
    mapView: {
        flex: 1,
    },
    websiteDisplay: {
        flexDirection: "row",
        alignItems: "flex-start",
        // justifyContent: "center",
        gap: 10,
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    websiteText: {
        fontSize: 16,
    },
});
