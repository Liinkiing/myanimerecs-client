import {action, observable} from 'mobx'

class AppStore {
  @observable public hasSearched: boolean = false

  @action public setHasSearched = (search: boolean) => {
    this.hasSearched = search
  }
}

export default new AppStore()

