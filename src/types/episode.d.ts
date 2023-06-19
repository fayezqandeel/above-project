export interface EpisodeWithoutId {
  series: string
  title: string
  description: string
  seasonNumber: number
  episodeNumber: number
  releaseDate: string
  imdbId: string
}

export type Episode = {
  id: number
} & EpisodeWithoutId;

export interface GetAllEpisodesResponse {
  listEpisodes?: Episode[]
}
