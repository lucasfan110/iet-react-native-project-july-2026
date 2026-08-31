import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

interface Props {
    style?: StyleProp<ViewStyle>;
}

export function Spinner({ style }: Props) {
    return (
        <View style={style}>
            <ActivityIndicator size="large" color="#DDD" />
        </View>
    );
}

const styles = StyleSheet.create({});
