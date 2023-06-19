export interface AddSaveEpisodeForm {
  onSubmit: (episode: Episode) => void
  onCancel: () => void
  data?: Episode
}
