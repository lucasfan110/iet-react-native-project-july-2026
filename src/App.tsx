import {
    createStaticNavigation,
    NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { FeedDetailScreen } from "./Screens/FeedDetailScreen";
import { FeedMainScreen } from "./Screens/FeedMainScreen";
import {
    createBottomTabNavigator,
    createBottomTabScreen,
} from "@react-navigation/bottom-tabs";
import { TabNavigator } from "./Navigators/TabNavigator";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

const queryClient = new QueryClient();

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const result = await db.getFirstAsync<{ user_version: number }>(
        "PRAGMA user_version",
    );
    let currentVersion = result?.user_version ?? 0;

    await db.execAsync("PRAGMA foreign_keys = ON;");

    if (currentVersion === 0) {
        await db.execAsync(`
            PRAGMA journal_mode = 'wal';
            CREATE TABLE location_sections (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL
            );
            CREATE TABLE locations (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                abbr TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL,
                link TEXT NOT NULL,
                icon TEXT NOT NULL,
                glyph TEXT NOT NULL,
                image TEXT,
                section_id INTEGER NOT NULL REFERENCES location_sections(id)
            );
        `);
        currentVersion++;
    }

    await db.execAsync(`PRAGMA user_version = ${currentVersion}`);
}

export function App() {
    return (
        <SQLiteProvider databaseName="app.db" onInit={migrateDbIfNeeded}>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <TabNavigator />
                </NavigationContainer>
            </QueryClientProvider>
        </SQLiteProvider>
    );
}

const styles = StyleSheet.create({});
