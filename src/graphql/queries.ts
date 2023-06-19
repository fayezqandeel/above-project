/* eslint-disable */
export const getAll: string = `query GetAllEpisodes($search: String) {
    listEpisodes(search: $search) {
      id
      title
      imdbId
      series
      description
      episodeNumber
      seasonNumber
      releaseDate
    }
}`;
