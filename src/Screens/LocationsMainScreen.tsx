import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useRef, useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    SectionList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { LocationItem } from "../Components/LocationItem";
import { Spinner } from "../Components/Spinner";
import { useLocationsData } from "../Hooks/useLocationsData";
import { AGGIE_BLUE, AGGIE_GOLD, commonStyles } from "../Theme/commonStyles";
import { LocationData } from "../Types/Locations";
import { LocationsStackParamList } from "../Types/LocationsStackParamList";
import { LoadingText } from "../Components/LoadingText";
import Pagination from "../Components/Pagination";

type LocationsMainScreenNavigationProp = NativeStackNavigationProp<
    LocationsStackParamList,
    "Main"
>;

const ITEMS_PER_PAGE = 50;

export function LocationsMainScreen() {
    const navigation = useNavigation<LocationsMainScreenNavigationProp>();
    const { data, isPending, error } = useLocationsData();
    const scrollViewRef = useRef<ScrollView>(null);

    const flattenedLocations = useMemo(() => {
        return data?.flatMap(block => block.locations);
    }, [data]);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPage = Math.ceil(
        (flattenedLocations?.length || 1) / ITEMS_PER_PAGE,
    );

    function scrollToTop() {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }

    function renderLocation(location: LocationData) {
        return (
            <LocationItem
                key={location.id}
                location={location}
                onPress={() => {
                    navigation.navigate("Detail", {
                        name: location.name,
                        lat: location.lat,
                        lng: location.lng,
                        link: location.link,
                    });
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
        <ScrollView
            style={styles.page}
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View>
                <Text style={[commonStyles.h2, styles.title]}>
                    Locations Directory
                </Text>
            </View>
            {isPending ? (
                <View style={[styles.spinnerContainer]}>
                    <Spinner />
                    <LoadingText />
                </View>
            ) : (
                <View>
                    {/* <FlatList
                        data={flattenedLocations?.slice(0, 50) ?? []}
                        keyExtractor={data => data.id}
                        renderItem={data => renderLocation(data.item)}
                        contentContainerStyle={[styles.locationsList]}
                        ListEmptyComponent={
                            <Text>There are no locations right now!</Text>
                        }
                    /> */}
                    <View style={styles.locationsList}>
                        {flattenedLocations
                            ?.slice(50 * (currentPage - 1), 50 * currentPage)
                            ?.map(data => renderLocation(data))}
                    </View>
                    <View style={styles.footer}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPage}
                            onPageChange={page => {
                                setCurrentPage(page);
                                scrollToTop();
                            }}
                        />
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    locationsList: {
        width: "100%",
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
        height: "100%",
        maxHeight: "100%",
        flex: 1,
    },
    spinnerContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "white",
        flex: 1,
    },
    footer: {
        backgroundColor: "white",
        paddingVertical: 20,
    },
});
