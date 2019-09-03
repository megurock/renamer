export interface ActionState {
  files: File[]
}

export type ActionType = 'filter' | 'rename'

export interface Action {
  name: string
  type: ActionType
  description: string
}
