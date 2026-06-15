import type { LiveStreamStatus } from "@/types";

const CACHE_TTL = 60_000; // 60 seconds

let cache: { data: LiveStreamStatus; timestamp: number } | null = null;

export async function getLiveStreamStatus(): Promise<LiveStreamStatus> {
  // Return cached result if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return {
      isLive: false,
      videoId: null,
      viewerCount: null,
      title: null,
      thumbnailUrl: null,
    };
  }

  try {
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("part", "id,snippet");
    searchUrl.searchParams.set("channelId", channelId);
    searchUrl.searchParams.set("eventType", "live");
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("key", apiKey);

    const res = await fetch(searchUrl.toString(), {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);

    const data = await res.json();
    const item = data.items?.[0];

    if (!item) {
      const result: LiveStreamStatus = {
        isLive: false,
        videoId: null,
        viewerCount: null,
        title: null,
        thumbnailUrl: null,
      };
      cache = { data: result, timestamp: Date.now() };
      return result;
    }

    const videoId = item.id.videoId;

    // Get live viewer count
    const videoUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    videoUrl.searchParams.set("part", "liveStreamingDetails,snippet");
    videoUrl.searchParams.set("id", videoId);
    videoUrl.searchParams.set("key", apiKey);

    const videoRes = await fetch(videoUrl.toString());
    const videoData = await videoRes.json();
    const videoItem = videoData.items?.[0];

    const result: LiveStreamStatus = {
      isLive: true,
      videoId,
      viewerCount:
        Number(videoItem?.liveStreamingDetails?.concurrentViewers) || null,
      title: item.snippet?.title ?? null,
      thumbnailUrl:
        item.snippet?.thumbnails?.high?.url ??
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };

    cache = { data: result, timestamp: Date.now() };
    return result;
  } catch (err) {
    console.error("YouTube API error:", err);
    return {
      isLive: false,
      videoId: null,
      viewerCount: null,
      title: null,
      thumbnailUrl: null,
    };
  }
}
