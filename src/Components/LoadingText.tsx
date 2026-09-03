import { useState, useEffect } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface Props {
    intervalMs?: number;
    style?: StyleProp<TextStyle>;
    text: string;
}

export function LoadingText({ intervalMs = 400, style, text }: Props) {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        const id = setInterval(() => {
            setDots(prev => (prev % 3) + 1);
        }, intervalMs);

        return () => clearInterval(id);
    }, [intervalMs]);

    return (
        <Text style={style}>
            {text}
            {".".repeat(dots)}
        </Text>
    );
}
