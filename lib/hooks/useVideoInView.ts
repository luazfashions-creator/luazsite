import { useEffect } from "react";

/**
 * A hook that auto-plays a video when it enters the viewport
 * and pauses it when it leaves to save memory and CPU.
 */
export function useVideoInView(videoRef: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use Intersection Observer to play/pause
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play but handle potential DOMException if interrupted
          video.play().catch(() => {
            // Ignore interruption errors when scrolling fast
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
      observer.disconnect();
      // Clean up video play state on unmount without destroying src (prevents flicker)
      if (video) {
        video.pause();
      }
    };
  }, [videoRef]);
}
