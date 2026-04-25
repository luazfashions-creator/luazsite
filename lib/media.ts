export function isVideoSource(src: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
}

export function playHoverVideo(video: HTMLVideoElement | null) {
  if (!video) return;

  video.currentTime = 0;
  void video.play().catch(() => undefined);
}

export function pauseHoverVideo(video: HTMLVideoElement | null) {
  if (!video) return;

  video.pause();
  video.currentTime = 0;
}
