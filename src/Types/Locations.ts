export interface LocationData {
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
