/* eslint-disable */
export const deleteEpisode: string = `
    mutation deleteEpisode($episodeId: String!) {
        deleteEpisode(episodeId: $episodeId)
    }
`;

export const addEpisode: string = `
    mutation addEpisode($episode: EpisodeInput!) {
        createEpisode(episode: $episode) {
            id
            title
            imdbId
            series
            description
            episodeNumber
            seasonNumber
            releaseDate
        }
    }
`;

export const editEpisode: string = `
    mutation editEpisode($episode: UpdateEpisodeInput!) {
        updateEpisode(episode: $episode) {
            id
            title
            imdbId
            series
            description
            episodeNumber
            seasonNumber
            releaseDate
        }
    }
`;
