import '@/assets/styles/footer.scss'
export default {
  data() {
    return {
      author: 'Ytengfei',
    }
  },
  render() {
    return (
      <div id='footer'>
        123
        <span> Written by {this.author} </span>
      </div>
    )
  },
}
