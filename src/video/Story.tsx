import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

const PixelGrid = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundImage: 'radial-gradient(circle, #262626 2px, transparent 2px)',
        backgroundSize: '48px 48px',
        opacity: 0.5,
      }}
    />
  );
};

const Title = ({ text, opacity }: { text: string; opacity: number }) => {
  return (
    <div
      style={{
        fontFamily,
        fontSize: '120px',
        fontWeight: 900,
        color: 'white',
        letterSpacing: '-0.05em',
        textTransform: 'uppercase',
        opacity,
        textAlign: 'center',
        width: '100%',
      }}
    >
      {text}
    </div>
  );
};

const Card = ({ children, opacity, translateY }: { children: React.ReactNode; opacity: number; translateY: number }) => {
  return (
    <div
      style={{
        width: '80%',
        backgroundColor: '#141414',
        border: '1px solid #262626',
        padding: '60px',
        opacity,
        transform: `translateY(${translateY}px)`,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {children}
    </div>
  );
};

export const Story: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Intro animation (0-3s)
  const introOpacity = interpolate(frame, [0, 30, 70, 90], [0, 1, 1, 0]);
  const introScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Thoughts section (3-6s)
  const thoughtsOpacity = interpolate(frame, [90, 110, 160, 180], [0, 1, 1, 0]);
  const thoughtsTranslateY = interpolate(frame, [90, 110], [50, 0], {
    extrapolateRight: 'clamp',
  });

  // Music section (6-9s)
  const musicOpacity = interpolate(frame, [180, 200, 250, 270], [0, 1, 1, 0]);
  const musicTranslateY = interpolate(frame, [180, 200], [50, 0], {
    extrapolateRight: 'clamp',
  });

  // Moments section (9-12s)
  const momentsOpacity = interpolate(frame, [270, 290, 340, 360], [0, 1, 1, 0]);
  const momentsTranslateY = interpolate(frame, [270, 290], [50, 0], {
    extrapolateRight: 'clamp',
  });

  // Outro section (12-15s)
  const outroOpacity = interpolate(frame, [360, 380, 450], [0, 1, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PixelGrid />

      {/* Intro */}
      <Sequence from={0} durationInFrames={90}>
        <div style={{ transform: `scale(${introScale})`, opacity: introOpacity }}>
          <Title text="Moez.love" opacity={1} />
          <div style={{ color: '#a3a3a3', fontFamily, fontSize: '32px', textAlign: 'center', marginTop: '20px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Personal Vault
          </div>
        </div>
      </Sequence>

      {/* Thoughts */}
      <Sequence from={90} durationInFrames={90}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Card opacity={thoughtsOpacity} translateY={thoughtsTranslateY}>
            <div style={{ color: '#a3a3a3', fontFamily, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Thoughts</div>
            <div style={{ color: 'white', fontFamily, fontSize: '48px', fontWeight: 600, lineHeight: 1.2 }}>
              Archiving the ephemeral moments of existence.
            </div>
          </Card>
        </div>
      </Sequence>

      {/* Music */}
      <Sequence from={180} durationInFrames={90}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Card opacity={musicOpacity} translateY={musicTranslateY}>
            <div style={{ color: '#a3a3a3', fontFamily, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Now Playing</div>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', backgroundColor: '#262626' }} />
              <div>
                <div style={{ color: 'white', fontFamily, fontSize: '40px', fontWeight: 600 }}>Midnight City</div>
                <div style={{ color: '#a3a3a3', fontFamily, fontSize: '28px' }}>M83</div>
              </div>
            </div>
          </Card>
        </div>
      </Sequence>

      {/* Moments */}
      <Sequence from={270} durationInFrames={90}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Card opacity={momentsOpacity} translateY={momentsTranslateY}>
            <div style={{ color: '#a3a3a3', fontFamily, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Moments</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ aspectRatio: '1/1', backgroundColor: '#262626' }} />
              <div style={{ aspectRatio: '1/1', backgroundColor: '#262626' }} />
            </div>
          </Card>
        </div>
      </Sequence>

      {/* Outro */}
      <Sequence from={360} durationInFrames={90}>
        <div style={{ opacity: outroOpacity, textAlign: 'center' }}>
          <Title text="Moez.love" opacity={1} />
          <div style={{ color: '#a3a3a3', fontFamily, fontSize: '28px', marginTop: '40px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Explore the archive
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
