export const PLATFORM_LOGOS: Record<string, string> = {
  Netflix: "/images/Netflix.webp",
  Prime: "/images/Prime.webp",
  PrimeVideo: "/images/Prime.webp",
  Amazon: "/images/Prime.webp",
  Disneyplus: "/images/Disney.webp",
  Disney: "/images/Disney.webp",
  HBO: "/images/hbo.webp",
  HboMax: "/images/hbo.webp",
  Max: "/images/hbo.webp",
  Crunchyroll: "/images/Crunchyroll.webp",
  Paramount: "/images/Paramount.webp",
  Starplus: "/images/start.jpg",
  Start: "/images/start.jpg",
  Spotify: "/images/Spotify.webp",
  Youtube: "/images/YoutubePremium.png",
  YoutubePremium: "/images/YoutubePremium.png",
  Universal: "/images/Universal.png",
  Vix: "/images/vix.webp",
  Plex: "/images/Plex.webp",
  Magistv: "/images/MagisTV.png",
  CanvaPro: "/images/CanvaPro.png",
  Dgo: "/images/Dgo.webp",
  Iptvpro: "/images/IptvPro.webp",
  Vikirakuten: "/images/VikiRakuten.png",
  AppleTv: "/images/apletv.jpeg",
};


export function normalize(text: string): string {
  return text
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z0-9]/g, "");
}


export function getPlatformSuggestions(input: string) {

  const clean = normalize(input);

  if (!clean) return [];

  return Object.keys(PLATFORM_LOGOS).filter((key) =>
    normalize(key).includes(clean)
  );

}

export function getPlatformLogo(name: string, customLogo?: string) {

  if (customLogo) return customLogo;

  const clean = normalize(name);

  const match = Object.keys(PLATFORM_LOGOS).find(
    (key) => normalize(key) === clean
  );

  return match
    ? PLATFORM_LOGOS[match]
    : "/images/todas.webp";

}