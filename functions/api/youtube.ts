// Cloudflare Pages Function - /api/youtube
// Fetches the latest videos from a YouTube channel automatically via RSS / Channel Scraper

interface YouTubeVideoItem {
  id: string;
  videoId: string;
  title: string;
  category: string;
  embedUrl: string;
  thumbnail: string;
  youtubeUrl: string;
  publishedAt?: string;
}

const FALLBACK_VIDEOS: YouTubeVideoItem[] = [
  {
    id: 'video-1',
    videoId: 'L696eMmxeGQ',
    title: 'NOKA AXL MIXTAPE - LATEST BREAKBEAT VOL. 1',
    category: 'LATEST MIXTAPE',
    embedUrl: 'https://www.youtube-nocookie.com/embed/L696eMmxeGQ',
    thumbnail: 'https://img.youtube.com/vi/L696eMmxeGQ/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=L696eMmxeGQ',
  },
  {
    id: 'video-2',
    videoId: 'qg_48RlVhvg',
    title: 'NOKA AXL MIXTAPE - EXCLUSIVE BREAKBEAT FULL BASS',
    category: 'EXCLUSIVE MIXTAPE',
    embedUrl: 'https://www.youtube-nocookie.com/embed/qg_48RlVhvg',
    thumbnail: 'https://img.youtube.com/vi/qg_48RlVhvg/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=qg_48RlVhvg',
  },
  {
    id: 'video-3',
    videoId: 'TncMXhnTdGc',
    title: 'NOKA AXL MIXTAPE - CLUB & FESTIVAL REMIX SET',
    category: 'FESTIVAL ANTHEM',
    embedUrl: 'https://www.youtube-nocookie.com/embed/TncMXhnTdGc',
    thumbnail: 'https://img.youtube.com/vi/TncMXhnTdGc/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=TncMXhnTdGc',
  },
];

export async function onRequestGet(context: any) {
  const { request } = context;
  const url = new URL(request.url);
  const handle = url.searchParams.get('handle') || 'NokaAxLMixtape';
  const cleanHandle = handle.replace(/^@/, '');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '3', 10), 10);

  try {
    // 1. Fetch channel page to extract RSS feed or Video IDs
    const channelUrl = `https://www.youtube.com/@${cleanHandle}/videos`;
    const res = await fetch(channelUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    });

    if (res.ok) {
      const html = await res.text();

      // Attempt 1: Extract channelId from meta tags or RSS link
      let channelId: string | null = null;
      const channelIdMatch =
        html.match(/<meta\s+itemprop="channelId"\s+content="([^"]+)"/i) ||
        html.match(/"channelId":"(UC[a-zA-Z0-9_-]{22})"/i) ||
        html.match(/<link\s+rel="alternate"\s+type="application\/rss\+xml"\s+title="RSS"\s+href="https:\/\/www\.youtube\.com\/feeds\/videos\.xml\?channel_id=([^"]+)"/i);

      if (channelIdMatch && channelIdMatch[1]) {
        channelId = channelIdMatch[1];
      }

      // If channelId found, fetch the official RSS feed for ultra-reliable XML parsing
      if (channelId) {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const rssRes = await fetch(rssUrl);
        if (rssRes.ok) {
          const xml = await rssRes.text();
          const videos = parseRssFeed(xml, limit);
          if (videos.length > 0) {
            return returnJsonResponse({
              success: true,
              source: 'youtube_rss',
              channelId,
              handle: `@${cleanHandle}`,
              videos,
            });
          }
        }
      }

      // Attempt 2: Extract videos directly from initial HTML data
      const extractedVideos = extractVideosFromHtml(html, limit);
      if (extractedVideos.length > 0) {
        return returnJsonResponse({
          success: true,
          source: 'youtube_html',
          handle: `@${cleanHandle}`,
          videos: extractedVideos,
        });
      }
    }
  } catch (err: any) {
    console.error('Error fetching latest YouTube videos:', err);
  }

  // Fallback if scraping/feed is unavailable
  return returnJsonResponse({
    success: true,
    source: 'fallback_default',
    handle: `@${cleanHandle}`,
    videos: FALLBACK_VIDEOS.slice(0, limit),
  });
}

function parseRssFeed(xml: string, limit: number): YouTubeVideoItem[] {
  const videos: YouTubeVideoItem[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null && videos.length < limit) {
    const entry = match[1];
    const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
    const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);

    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1].trim();
      const rawTitle = titleMatch ? titleMatch[1].trim() : 'NOKA AXL MIXTAPE';
      const cleanTitle = rawTitle.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

      videos.push({
        id: `yt-${videoId}`,
        videoId,
        title: cleanTitle,
        category: videos.length === 0 ? 'LATEST UPLOAD' : 'OFFICIAL MIXTAPE',
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        publishedAt: publishedMatch ? publishedMatch[1] : undefined,
      });
    }
  }

  return videos;
}

function extractVideosFromHtml(html: string, limit: number): YouTubeVideoItem[] {
  const videos: YouTubeVideoItem[] = [];
  const seenIds = new Set<string>();

  // Look for videoId patterns in JSON payloads
  const pattern = /"videoId":"([a-zA-Z0-9_-]{11})","thumbnail":\{"thumbnails":\[.*?\]\},"title":\{"runs":\[\{"text":"(.*?)"\}\]/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html)) !== null && videos.length < limit) {
    const videoId = match[1];
    const rawTitle = match[2];

    if (!seenIds.has(videoId)) {
      seenIds.add(videoId);
      videos.push({
        id: `yt-${videoId}`,
        videoId,
        title: rawTitle || 'NOKA AXL MIXTAPE',
        category: videos.length === 0 ? 'LATEST UPLOAD' : 'OFFICIAL MIXTAPE',
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
  }

  return videos;
}

function returnJsonResponse(data: any) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=600, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
}
