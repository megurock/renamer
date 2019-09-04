export interface ActionState {
  files: File[]
}

export enum ActionType {
  filter = 'filter',
  rename = 'rename',
}

export interface Action {
  readonly id: string,
  readonly name: string
  readonly type: ActionType
  readonly description: string
}
