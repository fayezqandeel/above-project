export interface BadgeProps {
  children: ReactNode
  className?: string
  block?: boolean
  variant?: 'danger' | 'warning' | 'info'
}

export interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  block?: boolean
  variant?: 'primary' | 'danger'
  onClick?: () => void
  size?: 'lg' | 'sm' | 'xs'
  rounded?: boolean
  wide?: boolean
  border?: boolean
  link?: boolean
}

export interface CardProps {
  children: ReactNode
  footer?: ReactNode
  onClick?: MouseEventHandler<HTMLDivElement>
}

export interface FieldProps {
  children: ReactNode
  error?: ReactNode
  className?: string
  label: string
  placeholder?: string
}

export interface ModalProps {
  children: ReactNode
  footer?: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  open: boolean
  onOpenChange?: (open: boolean) => void
}

export interface SearchProps {
  onChange: ChangeEventHandler<HTMLInputElement>
}

export interface EpisodeCardProps {
  item: Episode
  onDelete: (id: string) => void
}
