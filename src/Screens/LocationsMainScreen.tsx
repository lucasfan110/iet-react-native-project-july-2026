import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FeedItem } from "../Components/FeedItem";
import { Spinner } from "../Components/Spinner";
import { useLocationsData } from "../Hooks/useLocationsData";
import { Feed } from "../Types/Feed";
import { LocationsStackParamList } from "../Types/LocationsStackParamList";
import { AGGIE_BLUE, commonStyles } from "../Theme/commonStyles";
import { useMemo } from "react";
import { LocationItem } from "../Components/LocationItem";
import { LocationData } from "../Types/Locations";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type LocationsMainScreenNavigationProp = NativeStackNavigationProp<
    LocationsStackParamList,
    "Main"
>;

export function LocationsMainScreen() {
    const navigation = useNavigation<LocationsMainScreenNavigationProp>();
    const { data, isPending, error } = useLocationsData();

    const flattenedLocations = useMemo(() => {
        return data?.flatMap(block => block.locations);
    }, [data]);

    function renderLocation(location: LocationData) {
        return (
            <LocationItem
                location={location}
                onPress={() => {
                    console.log(`Clicked ${location.name}`);
                }}
            />
        );
    }

    if (error) {
        return (
            <View style={commonStyles.whiteBackground}>
                <Text style={commonStyles.errorText}>
                    Failed to load location directory! (Error: {error?.message})
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.page}>
            {isPending ? (
                <Spinner />
            ) : (
                <View>
                    <View>
                        <Text style={[commonStyles.h2, styles.title]}>
                            Locations Directory
                        </Text>
                    </View>
                    <FlatList
                        data={flattenedLocations?.slice(0, 50) ?? []}
                        keyExtractor={data => {
                            return data.lat?.concat(data.lng);
                        }}
                        renderItem={data => renderLocation(data.item)}
                        contentContainerStyle={[styles.locationsList]}
                        ListEmptyComponent={
                            <Text>There are no locations right now!</Text>
                        }
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    locationsList: {
        width: "100%",
        paddingBottom: 300,
        backgroundColor: "white",
    },
    title: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: AGGIE_BLUE,
        color: "white",
    },
    page: {
        backgroundColor: AGGIE_BLUE,
    },
});
