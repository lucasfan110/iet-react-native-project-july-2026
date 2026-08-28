import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Feed } from "../Types/Feed";

async function fetchAggieFeed() {
    // await new Promise(resolve => setTimeout(resolve, 2000));

    const res = await axios.get(
        "https://aggiefeed.ucdavis.edu/api/v1/activity/public?s=0&l=25",
    );

    return res.data;
}

export function useFeedData() {
    const query = useQuery<Feed[]>({
        queryKey: ["aggie-feed"],
        queryFn: fetchAggieFeed,
    });

    return query;
}
