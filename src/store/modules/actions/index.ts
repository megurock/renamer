import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { Action as ActionItem, ActionType } from './types'

@Module({ dynamic: true, store, name: 'actions', namespaced: true })
class Actions extends VuexModule {

  private list: ActionItem[] = [
    {
      id: 'F-001',
      name: 'ファイル/フォルダ/両方',
      description: 'アクションの対象を、ファイルだけ、フォルダだけ、または両方か、選択します。',
      type: ActionType.filter,
    },
    {
      id: 'F-002',
      name: '拡張子によるフィルタ',
      description: 'ファイルを拡張子でフィルタリングします。',
      type: ActionType.filter,
    },
    {
      id: 'R-001',
      name: '連番付きファイル名に変更',
      description: 'ファイルを連番付きの名前に変更します。',
      type: ActionType.rename,
    },
    {
      id: 'R-002',
      name: 'ファイル名に連番を追加',
      description: 'ファイル名の最初、あるいは最後に連番を追加します。',
      type: ActionType.rename,
    },
  ]

  private _selectedActionType: ActionType = ActionType.filter
  public get selectedActionType(): ActionType { return this._selectedActionType }

  private _selectedActionList: ActionItem[] = []
  public get selectedActionList(): ActionItem[] { return this._selectedActionList }

  /**
   *
   */
  @Mutation
  public setActionType(type: ActionType): void {
    this._selectedActionType = type
  }

  /**
   *
   */
  @Mutation
  public addAction(action: ActionItem, index?: number): ActionItem[] {
    if (index) {
      this._selectedActionList.splice(index, 0, action)
    } else {
      this._selectedActionList.push(action)
    }
    return this._selectedActionList
  }

  /**
   *
   */
  @Mutation
  public removeAction(index: number): ActionItem[] {
    this._selectedActionList.splice(index, 1)
    return this._selectedActionList
  }

  /**
   *
   */
  @Mutation
  public removeAllActions(): ActionItem[] {
    this._selectedActionList = []
    return this._selectedActionList
  }

  /**
   *
   */
  public get actionTypeList(): string[] {
    return Object.entries(ActionType).map(([key, value]) => value)
  }

  /**
   *
   */
  public get filteredActionList(): ActionItem[] {
    return this.list.filter((action: ActionItem) => action.type === this._selectedActionType)
  }

}

export default getModule(Actions)
