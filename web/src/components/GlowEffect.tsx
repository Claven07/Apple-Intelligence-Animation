import React, { useState, useEffect } from 'react';

// Apple Intelligence Glow Effect Component
interface GradientStop {
    color: string;
    location: number;
}

const generateGradientStops = (): GradientStop[] => {
    const colors = [
        '#BC82F3', // Purple
        '#F5B9EA', // Pink
        '#8D9FFF', // Blue
        '#FF6778', // Red
        '#FFBA71', // Orange
        '#C686FF'  // Light Purple
    ];

    return colors
        .map(color => ({
            color,
            location: Math.random()
        }))
        .sort((a, b) => a.location - b.location);
};

const createConicGradient = (stops: GradientStop[]): string => {
    const sortedStops = [...stops].sort((a, b) => a.location - b.location);
    const gradientString = sortedStops
        .map(stop => `${stop.color} ${stop.location * 100}%`)
        .join(', ');
    return `conic-gradient(from 0deg, ${gradientString})`;
};

const GlowLayer: React.FC<{
    stops: GradientStop[];
    spread: number;
    blur: number;
    opacity: number;
    transitionDuration: string;
    transitionTiming?: string;
}> = ({ stops, spread, blur, opacity, transitionDuration, transitionTiming = 'cubic-bezier(0.4, 0, 0.2, 1)' }) => {
    const borderRadius = '52px'; // Matched to frame radius (approx)
    const gradient = createConicGradient(stops);

    // Generate an SVG mask to ensure accurate border radius subtraction
    // We use a data URI SVG with internal CSS to handle the calc() logic for the hole size
    // ensuring the inner radius matches the frame.
    const maskImage = React.useMemo(() => {
        const svg = `
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <mask id="m">
                    <rect width="100%" height="100%" fill="white"/>
                    <rect 
                        x="${spread}px" 
                        y="${spread}px" 
                        rx="${borderRadius}" 
                        style="width: calc(100% - ${spread * 2}px); height: calc(100% - ${spread * 2}px)" 
                        fill="black"
                    />
                </mask>
            </defs>
            <rect width="100%" height="100%" fill="white" mask="url(#m)"/>
        </svg>
        `.replace(/\s+/g, ' ').trim();
        return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
    }, [spread, borderRadius]);

    return (
        <div
            style={{
                position: 'absolute',
                pointerEvents: 'none',
                inset: 0,
                opacity: opacity,
                filter: blur > 0 ? `blur(${blur}px)` : 'none',
                // Remove transition from here as background is now on child
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: borderRadius,
                    background: gradient,
                    transition: `background ${transitionDuration} ${transitionTiming}`,
                    maskImage: maskImage,
                    WebkitMaskImage: maskImage,
                    // SVG mask handles composition internally
                }}
            />
        </div>
    );
};

export const GlowEffect: React.FC<{ className?: string }> = ({ className = '' }) => {
    const [gradientStops1, setGradientStops1] = useState<GradientStop[]>(generateGradientStops());
    const [gradientStops2, setGradientStops2] = useState<GradientStop[]>(generateGradientStops());
    const [gradientStops3, setGradientStops3] = useState<GradientStop[]>(generateGradientStops());
    const [gradientStops4, setGradientStops4] = useState<GradientStop[]>(generateGradientStops());
    const [gradientStops5, setGradientStops5] = useState<GradientStop[]>(generateGradientStops());

    useEffect(() => {
        const baseDelay = 500;

        const timer1 = setInterval(() => setGradientStops1(generateGradientStops()), baseDelay);
        const timer2 = setInterval(() => setGradientStops2(generateGradientStops()), baseDelay + 50);
        const timer3 = setInterval(() => setGradientStops3(generateGradientStops()), baseDelay + 100);
        const timer4 = setInterval(() => setGradientStops4(generateGradientStops()), baseDelay + 150);
        const timer5 = setInterval(() => setGradientStops5(generateGradientStops()), baseDelay + 200);

        return () => {
            clearInterval(timer1);
            clearInterval(timer2);
            clearInterval(timer3);
            clearInterval(timer4);
            clearInterval(timer5);
        };
    }, []);

    return (
        <div
            className={className}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                borderRadius: '52px',
                zIndex: 1,
                isolation: 'isolate'
            }}
        >

            <GlowLayer stops={gradientStops1} spread={6} blur={0} opacity={1} transitionDuration="0.5s" />
            <GlowLayer stops={gradientStops2} spread={9} blur={4} opacity={0.85} transitionDuration="0.55s" />
            <GlowLayer stops={gradientStops3} spread={11} blur={12} opacity={0.7} transitionDuration="0.6s" />
            <GlowLayer stops={gradientStops4} spread={15} blur={15} opacity={0.5} transitionDuration="0.65s" />
            <GlowLayer stops={gradientStops5} spread={20} blur={25} opacity={0.3} transitionDuration="0.7s" />
        </div>
    );
};
