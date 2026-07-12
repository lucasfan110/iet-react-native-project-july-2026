import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function Spinner() {
    return (
        <View>
            <ActivityIndicator size="large" color="#DDD" />
        </View>
    );
}

const styles = StyleSheet.create({});

export default Spinner;
