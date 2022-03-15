import { observable, action } from 'mobx'
class Store {
  @observable time = '2020'
  @observable inputValue = ''
  @observable todos = ['time 8, coding', 'time 9, meeting', 'time 10, sleeping']
  @action.bound changeInput(value) {
    this.inputValue = value
  }
  @action.bound addTodo() {
    this.todos.push(this.inputValue)
    this.inputValue = ''
  }
  @action.bound delTodo(index) {
    this.todos.splice(index, 1)
  }
  @action.bound resetTodos() {
    this.todos = []
  }
}
const store = new Store()
export default store
