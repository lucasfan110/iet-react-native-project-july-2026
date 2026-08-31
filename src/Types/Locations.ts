export interface LocationData {
    id: string;
    name: string;
    abbr: string;
    lat: string;
    lng: string;
    link: string;
    icon: string;
    glyph: string;
    image?: string;
}

export interface LocationBlock {
    name: string;
    locations: LocationData[];
}
