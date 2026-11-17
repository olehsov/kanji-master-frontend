const YOUTUBE_API_SRC = 'https://www.youtube.com/iframe_api';

let apiReady: Promise<void> | null = null;

/** Loads the YouTube IFrame API once, on first use. */
export function loadYoutubeIframeApi(): Promise<void> {
  if (window.YT?.Player) {
    return Promise.resolve();
  }
  apiReady ??= new Promise<void>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const script = document.createElement('script');
    script.src = YOUTUBE_API_SRC;
    script.onerror = () => {
      apiReady = null;
      reject(new Error('Failed to load the YouTube IFrame API.'));
    };
    document.head.appendChild(script);
  });
  return apiReady;
}
