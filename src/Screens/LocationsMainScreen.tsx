import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingText } from "../Components/LoadingText";
import { LocationItem } from "../Components/LocationItem";
import Pagination from "../Components/Pagination";
import SearchBar from "../Components/SearchBar";
import { Spinner } from "../Components/Spinner";
import { useLocationsData } from "../Hooks/useLocationsData";
import { AGGIE_BLUE, commonStyles } from "../Theme/commonStyles";
import { LocationData } from "../Types/Locations";
import { LocationsStackParamList } from "../Types/LocationsStackParamList";

type LocationsMainScreenNavigationProp = NativeStackNavigationProp<
    LocationsStackParamList,
    "Main"
>;

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findAllMatches(haystack: string, userInput: string): number[] {
    const regex = new RegExp(escapeRegex(userInput), "gi"); // g = global, i = case-insensitive
    return [...haystack.matchAll(regex)].map(m => m.index);
}

const ITEMS_PER_PAGE = 50;
const TIME_MS_TILL_AUTOMATIC_SEARCH = 500;

export function LocationsMainScreen() {
    const navigation = useNavigation<LocationsMainScreenNavigationProp>();
    const { data, isPending, error } = useLocationsData();
    const scrollViewRef = useRef<ScrollView>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const currentSearchTimerId = useRef<number | null>(null);
    // Item id as key, indices of highlight as value
    const textMatchInfo = useRef<Map<string, number[]>>(new Map());

    const flattenedLocations = useMemo(() => {
        return data?.flatMap(block => block.locations) ?? [];
    }, [data]);

    const [currentlyDisplayedLocations, setCurrentlyDisplayedLocations] =
        useState<LocationData[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPage = Math.ceil(
        (currentlyDisplayedLocations?.length || 1) / ITEMS_PER_PAGE,
    );

    useEffect(() => {
        if (searchQuery === "") {
            search("");
            clearTimeout(currentSearchTimerId.current);
        } else {
            currentSearchTimerId.current = setTimeout(
                () => search(searchQuery),
                TIME_MS_TILL_AUTOMATIC_SEARCH,
            );
        }

        return () => clearTimeout(currentSearchTimerId.current);
    }, [searchQuery]);

    useEffect(() => {
        setCurrentlyDisplayedLocations(flattenedLocations);
        search("");
    }, [flattenedLocations]);

    function scrollToTop() {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }

    function search(searchQuery: string) {
        textMatchInfo.current.clear();

        if (searchQuery === "") {
            setCurrentlyDisplayedLocations(flattenedLocations);
            return;
        }

        const filteredDisplayData: LocationData[] = [];

        for (const location of flattenedLocations) {
            const indices = findAllMatches(location.name, searchQuery);

            if (indices.length > 0) {
                textMatchInfo.current.set(location.id, indices);
                filteredDisplayData.push(location);
            }
        }

        setCurrentlyDisplayedLocations(filteredDisplayData);
    }

    function renderLocation(location: LocationData) {
        const textBoldInfo: { start: number; stop: number }[] = [];

        const info = textMatchInfo.current.get(location.id) ?? [];
        for (const index of info) {
            textBoldInfo.push({
                start: index,
                stop: index + searchQuery.length,
            });
        }

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
                boldOn={textBoldInfo}
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
            <View style={styles.header}>
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    containerStyle={styles.searchBar}
                    onSubmit={query => {
                        clearTimeout(currentSearchTimerId.current);
                        search(query);
                    }}
                    placeholder="Search locations"
                />
            </View>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.scrollView}
            >
                {isPending ? (
                    <View style={[styles.spinnerContainer]}>
                        <Spinner />
                        <LoadingText />
                    </View>
                ) : (
                    <View style={styles.mainContainer}>
                        <View style={styles.locationsList}>
                            {currentlyDisplayedLocations
                                .slice(50 * (currentPage - 1), 50 * currentPage)
                                .map(data => renderLocation(data))}
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
        </View>
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
    mainContainer: {
        backgroundColor: "white",
        flex: 1,
    },
    searchBar: {
        marginTop: 70,
        marginBottom: 30,
    },
    header: {},
    scrollView: {},
});
