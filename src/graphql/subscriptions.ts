export const onCreateEpisode = `
  subscription OnCreateEpisode {
    onCreateEpisode {
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

export const onDeleteEpisode = `
  subscription OnDeleteEpisode {
    onDeleteEpisode
  }
`;

export const onUpdateEpisode = `
  subscription OnUpdateEpisode {
    onUpdateEpisode {
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
