import React from 'react';
import { Composition } from 'remotion';
import { Story } from './Story';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InstagramStory"
        component={Story}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
