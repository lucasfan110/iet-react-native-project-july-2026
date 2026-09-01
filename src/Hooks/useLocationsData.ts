import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Feed } from "../Types/Feed";
import { LocationBlock } from "../Types/Locations";
import { nanoid } from "nanoid/non-secure";

async function fetchLocations(): Promise<LocationBlock[]> {
    await new Promise(resolve => {
        setTimeout(resolve, 5000);
    });

    const campusMap = axios.get(
        "https://mobile.ucdavis.edu/api/v2/locations/campus-map",
    );

    const studySpots = axios.get(
        "https://mobile.ucdavis.edu/api/v2/locations/study-spots",
    );

    const allLocationsDataRaw = await Promise.all([campusMap, studySpots]);

    // All the campus map data set to here
    const allLocationsData: LocationBlock[] = allLocationsDataRaw[0].data;

    // Push the study spots data, as a location block
    allLocationsData.push({
        name: "Study Spots",
        locations: allLocationsDataRaw[1].data,
    });

    for (const locationBlock of allLocationsData) {
        for (const location of locationBlock.locations) {
            location.id = nanoid();
        }
    }

    return allLocationsData;
}

export function useLocationsData() {
    const query = useQuery<LocationBlock[]>({
        queryKey: ["locations-directory"],
        queryFn: fetchLocations,
    });

    return query;
}
