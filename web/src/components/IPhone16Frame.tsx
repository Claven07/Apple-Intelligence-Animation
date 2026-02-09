import React from 'react';
import type { PropsWithChildren } from 'react';

export const IPhone16Frame: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '400px',
                height: '860px',
                background: '#121212', // Dark titanium finish
                borderRadius: '68px',
                boxShadow:
                    'inset 0 0 4px 2px rgba(255,255,255,0.1), inset 0 0 0 6px #2a2a2a, 0 30px 60px rgba(0,0,0,0.6)',
                padding: '16px', // Bezel thickness roughly
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                border: '1px solid #333',
            }}
        >
            {/* Screen Area */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: '#000',
                    borderRadius: '52px', // Screen radius
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.1)', // Subtle inner lip
                    zIndex: 10
                }}
            >
                {/* Dynamic Island Container */}
                <div
                    style={{
                        position: 'absolute',
                        top: '11px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '126px', // Dynamic island width
                        height: '37px', // Dynamic island height
                        backgroundColor: '#000',
                        borderRadius: '24px',
                        zIndex: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 12px',
                        boxSizing: 'border-box',
                    }}
                >
                </div>

                {/* Content */}
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    {children}
                </div>
            </div>

            {/* Hardware Buttons */}
            {/* Power */}
            <div
                style={{
                    position: 'absolute',
                    right: '-4px',
                    top: '220px',
                    width: '6px',
                    height: '96px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '4px',
                    boxShadow: 'inset 2px 0 2px rgba(0,0,0,0.5)',
                }}
            />

            {/* Volume Up */}
            <div
                style={{
                    position: 'absolute',
                    left: '-4px',
                    top: '190px',
                    width: '6px',
                    height: '64px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '4px',
                    boxShadow: 'inset -2px 0 2px rgba(0,0,0,0.5)',
                }}
            />

            {/* Volume Down */}
            <div
                style={{
                    position: 'absolute',
                    left: '-4px',
                    top: '270px',
                    width: '6px',
                    height: '64px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '4px',
                    boxShadow: 'inset -2px 0 2px rgba(0,0,0,0.5)',
                }}
            />

            {/* Action Button (Smaller, top left) */}
            <div
                style={{
                    position: 'absolute',
                    left: '-4px',
                    top: '130px',
                    width: '6px',
                    height: '36px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '4px',
                    boxShadow: 'inset -2px 0 2px rgba(0,0,0,0.5)',
                }}
            />
        </div>
    );
};
