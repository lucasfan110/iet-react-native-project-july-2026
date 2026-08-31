import { useState, useEffect } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface Props {
    intervalMs?: number;
    style?: StyleProp<TextStyle>;
}

export function LoadingText({ intervalMs = 400, style }: Props) {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        const id = setInterval(() => {
            setDots(prev => (prev % 3) + 1);
        }, intervalMs);

        return () => clearInterval(id);
    }, [intervalMs]);

    return <Text style={style}>Loading{".".repeat(dots)}</Text>;
}
