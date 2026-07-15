export interface Feed {
    _id: string;
    title: string;
    actor: {
        displayName: string;
    };
    object: {
        objectType: string;
        content: string;
        ucdEdusModel: {
            url: string;
            urlDisplayName: string;
        };
        event?: {
            location: string;
            startDate: string;
            endDate: string;
        };
    };
    published: string;
}
