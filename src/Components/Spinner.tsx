import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function Spinner() {
    return (
        <View>
            <ActivityIndicator size="large" color="#DDD" />
        </View>
    );
}

const styles = StyleSheet.create({});
