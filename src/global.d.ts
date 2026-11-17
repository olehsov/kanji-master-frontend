/* Globals injected by third-party scripts (YouTube IFrame API, Spotify SDK). */
export {};

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
    Spotify?: any;
    onSpotifyWebPlaybackSDKReady?: () => void;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}
