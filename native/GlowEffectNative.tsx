import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, SweepGradient, BlurMask, Circle, vec, RoundedRect, Group } from '@shopify/react-native-skia';
import {
    useSharedValue,
    withTiming,
    useDerivedValue,
    Easing,
    interpolateColor,
    withRepeat
} from 'react-native-reanimated';

// NOTE: This implementation requires:
// 1. react-native-reanimated
// 2. @shopify/react-native-skia

const COLORS = [
    "#BC82F3", "#F5B9EA", "#8D9FFF", "#FF6778", "#FFBA71", "#C686FF"
];

// Helper to generate sorted random stops
const generateStops = () => {
    // Each color gets a random location, then we sort by location.
    // This ensures colors shuffle their order around the circle.
    return COLORS.map(color => ({
        color,
        location: Math.random()
    })).sort((a, b) => a.location - b.location);
};

const SCREEN = Dimensions.get('window');

export const GlowEffectNative = () => {
    return (
        <View style={styles.container}>
            {/* EffectNoBlur */}
            <EffectLayer width={6} blur={0} duration={2000} />

            {/* Effect 1 */}
            <EffectLayer width={9} blur={4} duration={2400} />

            {/* Effect 2 */}
            <EffectLayer width={11} blur={12} duration={3200} />

            {/* Effect 3 */}
            <EffectLayer width={15} blur={15} duration={4000} />
        </View>
    );
};

const EffectLayer = ({ width, blur, duration }: { width: number, blur: number, duration: number }) => {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: duration, easing: Easing.linear }),
            -1
        );
    }, [duration]);

    const gradientColors = [...COLORS, COLORS[0]];
    const gradientPositions = [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1];

    return (
        <View style={[StyleSheet.absoluteFill]}>
            <Canvas style={{ flex: 1 }}>
                <Group
                    origin={vec(SCREEN.width / 2, SCREEN.height / 2)}
                    transform={useDerivedValue(() => [{ rotate: rotation.value }])}
                >
                    <RoundedRect
                        x={width}
                        y={width}
                        width={SCREEN.width - width * 2}
                        height={SCREEN.height - width * 2}
                        r={55}
                        color="transparent"
                        style="stroke"
                        strokeWidth={width}
                    >
                        <SweepGradient
                            c={vec(SCREEN.width / 2, SCREEN.height / 2)}
                            colors={gradientColors}
                        />
                        <BlurMask blur={blur} style="normal" />
                    </RoundedRect>
                </Group>
            </Canvas>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
