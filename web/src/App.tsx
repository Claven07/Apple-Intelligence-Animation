import { useState } from "react";
import { GlowEffect } from "./components/GlowEffect";
import { IPhone16Frame } from "./components/IPhone16Frame";


function App() {
  const [wallpaper, setWallpaper] = useState<'photo' | 'white' | 'black'>('photo');

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundImage: 'url(/wwdc_25_bento_ipados-1749519581569.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#f5f5f7',
      color: '#fff',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'row', // changed valid row layout
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      gap: '60px'
    }}>

      {/* Phone Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: '280px',
          height: '602px',
          position: 'relative',
          flexShrink: 0,
        }}>
          <div style={{
            transform: 'scale(0.7)',
            transformOrigin: '0 0',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '400px',
            height: '860px',
          }}>
            <IPhone16Frame>
              {/* Wallpaper Layer */}
              {wallpaper === 'photo' ? (
                <img
                  src="/IMG_6899.PNG"
                  alt="iPhone Wallpaper"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0
                  }}
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: wallpaper === 'white' ? '#ffffff' : '#000000',
                    zIndex: 0
                  }}
                />
              )}

              <GlowEffect />

              {/* Overlay Content in Phone */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                zIndex: 50
              }}>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: wallpaper === 'white' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                  textShadow: wallpaper === 'white' ? 'none' : '0 10px 20px rgba(0, 0, 0, 0.5)',
                  textAlign: 'center'
                }}>
                </h1>
                <p style={{
                  marginTop: '0.75rem',
                  color: wallpaper === 'white' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1rem'
                }}>
                </p>
              </div>
            </IPhone16Frame>
          </div>
        </div>

        {/* Background hint */}
        <div style={{
          marginTop: '20px',
          color: '#444',
          fontSize: '14px',
          pointerEvents: 'none',
          textAlign: 'center'
        }}>
          iPhone 16
        </div>
      </div>

      {/* Controls Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '24px',
        // Liquid glass effect
        background: 'rgba(60, 60, 60, 0.4)', // Lighter, more translucent
        backdropFilter: 'blur(40px) saturate(180%)', // Heavy blur + saturation for "vibrant" glass
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.2)', // Sharper border
        minWidth: '220px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)', // Soft shadow + inner ring
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'
      }}>
        <h3 style={{
          margin: '0 0 8px 4px',
          fontSize: '13px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
          Wallpapers
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'white', label: 'White' },
            { id: 'black', label: 'Black' },
            { id: 'photo', label: 'Wallpaper' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setWallpaper(item.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // Space between text and dot
                padding: '14px 20px',
                borderRadius: '18px',
                border: 'none',
                // Active state uses a stronger glass background
                background: wallpaper === item.id ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '17px',
                textAlign: 'left',
                transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
                fontWeight: 500,
                outline: 'none',
                width: '100%',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (wallpaper !== item.id) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                if (wallpaper !== item.id) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <span style={{ letterSpacing: '-0.01em' }}>{item.label}</span>

              {/* Selection Dot */}
              {wallpaper === item.id && (
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#fff', // White dot for cleaner look
                  boxShadow: '0 0 8px rgba(255,255,255,0.8)'
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
