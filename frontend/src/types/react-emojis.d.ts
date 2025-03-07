declare module 'react-emojis' {
  import React from 'react';

  interface EmojiProps {
    emoji: string;
  }

  const Emoji: React.FC<EmojiProps>;

  export default Emoji;
}