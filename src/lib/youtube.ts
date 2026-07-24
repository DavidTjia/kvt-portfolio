export function extractVideoId(url: string): string | null {
  const short = url.match(/youtu\.be\/([\w-]{11})/);
  if (short) return short[1];

  const watch = url.match(/[?&]v=([\w-]{11})/);
  if (watch) return watch[1];

  const embed = url.match(/youtube\.com\/embed\/([\w-]{11})/);
  if (embed) return embed[1];

  return null;
}

export function toYouTubeBackgroundUrl(url: string): string {
  const id = extractVideoId(url);
  if (!id) return url;

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    playsinline: "1",
    controls: "0",
    fs: "0",
    disablekb: "1",
    iv_load_policy: "3",
    cc_load_policy: "0",
    modestbranding: "1",
    rel: "0",
  });

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
