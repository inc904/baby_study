import { observable, action, runInAction } from 'mobx'

class AppStore {
  @observable time = '2020'
  @observable inputValue = 'new todo'
  @observable todos = ['time 8, coding', 'time 9, meeting', 'time 10, sleeping']
  @action.bound changeInputValue(value) {
    this.inputValue = value
  }
  @action.bound async addTodo() {
    await runInAction(() => {
      this.todos.push(this.inputValue)
    })
    console.log(this.inputValue)
    console.log(this.todos)
  }
  @action.bound deleteTodo(index) {
    this.todos.splice(index, 1)
    console.log('del')
    console.log(this.todos)
  }
  @action.bound resetTodos() {
    this.todos = []
  }
}
const store = new AppStore()
export default store
