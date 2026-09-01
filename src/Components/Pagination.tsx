import React, { useMemo } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from "react-native";

/**
 * A dependency-free pagination control for React Native.
 *
 * Renders Prev / page-number / Next buttons, truncating long page ranges
 * with ellipses (e.g. `1  2  3  …  9  10`). Pass it the current page and
 * total page count and it tells you when the page changes via `onPageChange`
 * — it does not manage page state itself.
 */

const DOTS = "DOTS" as const;
type PageToken = number | typeof DOTS;

export interface PaginationColors {
    activeBackground: string;
    activeText: string;
    inactiveBackground: string;
    inactiveText: string;
    border: string;
    disabledText: string;
    dotsText: string;
}

const DEFAULT_COLORS: PaginationColors = {
    activeBackground: "#111827",
    activeText: "#FFFFFF",
    inactiveBackground: "#FFFFFF",
    inactiveText: "#111827",
    border: "#E5E7EB",
    disabledText: "#C1C5CC",
    dotsText: "#9AA1AC",
};

export interface PaginationProps {
    /** Current page, 1-indexed. */
    currentPage: number;
    /** Total number of pages. */
    totalPages: number;
    /** Called with the new page number whenever the user picks a page. */
    onPageChange: (page: number) => void;
    /** How many page numbers to show on each side of the current page. Default 1. */
    siblingCount?: number;
    /** Show "‹ Prev" / "Next ›" buttons. Default true. */
    showPrevNext?: boolean;
    /** Compact mode shows just "‹  Page 3 of 12  ›" instead of individual page numbers. */
    compact?: boolean;
    /** Disable all interaction (e.g. while a page is loading). */
    disabled?: boolean;
    /** Override any subset of the default colors. */
    colors?: Partial<PaginationColors>;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}

function range(start: number, end: number): number[] {
    const out: number[] = [];
    for (let i = start; i <= end; i++) out.push(i);
    return out;
}

/**
 * Builds the list of page tokens to render, collapsing runs of hidden pages
 * into a single DOTS token. Always keeps the first and last page visible.
 */
function usePaginationRange(
    totalPages: number,
    currentPage: number,
    siblingCount: number,
): PageToken[] {
    return useMemo(() => {
        const totalSlots = siblingCount * 2 + 5; // first + last + current + 2*siblings + 2*dots (max)

        if (totalPages <= totalSlots) {
            return range(1, totalPages);
        }

        const leftSibling = Math.max(currentPage - siblingCount, 1);
        const rightSibling = Math.min(currentPage + siblingCount, totalPages);

        const showLeftDots = leftSibling > 2;
        const showRightDots = rightSibling < totalPages - 1;

        if (!showLeftDots && showRightDots) {
            const leftCount = 3 + siblingCount * 2;
            return [...range(1, leftCount), DOTS, totalPages];
        }

        if (showLeftDots && !showRightDots) {
            const rightCount = 3 + siblingCount * 2;
            return [1, DOTS, ...range(totalPages - rightCount + 1, totalPages)];
        }

        return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, totalPages];
    }, [totalPages, currentPage, siblingCount]);
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    showPrevNext = true,
    compact = false,
    disabled = false,
    colors: colorOverrides,
    style,
    testID,
}: PaginationProps) {
    const colors = { ...DEFAULT_COLORS, ...colorOverrides };
    const pageTokens = usePaginationRange(
        totalPages,
        currentPage,
        siblingCount,
    );

    if (totalPages <= 1) return null;

    const canGoPrev = !disabled && currentPage > 1;
    const canGoNext = !disabled && currentPage < totalPages;

    const goTo = (page: number) => {
        if (disabled || page < 1 || page > totalPages || page === currentPage)
            return;
        onPageChange(page);
    };

    return (
        <View
            style={[styles.row, style]}
            testID={testID}
            accessibilityRole="tablist"
        >
            {showPrevNext && (
                <NavButton
                    label="<"
                    accessibilityLabel="Previous page"
                    onPress={() => goTo(currentPage - 1)}
                    enabled={canGoPrev}
                    colors={colors}
                />
            )}

            {compact ? (
                <View style={styles.compactLabel}>
                    <Text
                        style={[
                            styles.compactText,
                            { color: colors.inactiveText },
                        ]}
                    >
                        Page {currentPage} of {totalPages}
                    </Text>
                </View>
            ) : (
                pageTokens.map((token, index) =>
                    token === DOTS ? (
                        <View key={`dots-${index}`} style={styles.dotsWrap}>
                            <Text
                                style={[
                                    styles.dotsText,
                                    { color: colors.dotsText },
                                ]}
                            >
                                …
                            </Text>
                        </View>
                    ) : (
                        <PageButton
                            key={token}
                            page={token}
                            isActive={token === currentPage}
                            disabled={disabled}
                            onPress={() => goTo(token)}
                            colors={colors}
                        />
                    ),
                )
            )}

            {showPrevNext && (
                <NavButton
                    label=">"
                    accessibilityLabel="Next page"
                    onPress={() => goTo(currentPage + 1)}
                    enabled={canGoNext}
                    colors={colors}
                />
            )}
        </View>
    );
}

function PageButton({
    page,
    isActive,
    disabled,
    onPress,
    colors,
}: {
    page: number;
    isActive: boolean;
    disabled: boolean;
    onPress: () => void;
    colors: PaginationColors;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Page ${page}`}
            accessibilityState={{ selected: isActive, disabled }}
            style={[
                styles.pageButton,
                {
                    backgroundColor: isActive
                        ? colors.activeBackground
                        : colors.inactiveBackground,
                    borderColor: isActive
                        ? colors.activeBackground
                        : colors.border,
                },
                disabled && styles.disabled,
            ]}
        >
            <Text
                style={[
                    styles.pageText,
                    {
                        color: isActive
                            ? colors.activeText
                            : colors.inactiveText,
                    },
                    disabled && { color: colors.disabledText },
                ]}
            >
                {page}
            </Text>
        </TouchableOpacity>
    );
}

function NavButton({
    label,
    accessibilityLabel,
    onPress,
    enabled,
    colors,
}: {
    label: string;
    accessibilityLabel: string;
    onPress: () => void;
    enabled: boolean;
    colors: PaginationColors;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!enabled}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ disabled: !enabled }}
            style={[
                styles.navButton,
                {
                    borderColor: colors.border,
                    backgroundColor: colors.inactiveBackground,
                },
                !enabled && styles.disabled,
            ]}
        >
            <Text
                style={[
                    styles.navText,
                    {
                        color: enabled
                            ? colors.inactiveText
                            : colors.disabledText,
                    },
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    pageButton: {
        minWidth: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
    },
    pageText: {
        fontSize: 14,
        fontWeight: "600",
    },
    navButton: {
        width: 36,
        height: 36,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        alignItems: "center",
        justifyContent: "center",
    },
    navText: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: -2,
    },
    dotsWrap: {
        minWidth: 24,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    dotsText: {
        fontSize: 16,
        fontWeight: "600",
    },
    compactLabel: {
        paddingHorizontal: 12,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    compactText: {
        fontSize: 14,
        fontWeight: "500",
    },
    disabled: {
        opacity: 0.4,
    },
});
