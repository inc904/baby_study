import React from 'react'
export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userinfo: {
        name: 'Ant',
        time: '19999',
        avatar: {
          small:
            'http://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578705064.jpg',
          large:
            'http://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578705064.jpg',
          medium:
            'http://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578705064.jpg'
        }
      },
      info: {},
      images: {}
    }
  }
  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({
        info: {
          images: {
            small:
              'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577327922.webp',
            large:
              'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577327922.webp',
            medium:
              'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577327922.webp'
          },
          text: '89097897',
          small:
            'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577327922.webp',
          images: {
            small:
              'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577327922.webp',
            large:
              'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577327922.webp',
            medium:
              'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577327922.webp'
          }
        }
      })
    }, 1000)
  }
  render() {
    return (
      <div>
        <p>{this.state.userinfo.name}</p>
        <p>{this.state.userinfo.time}</p>
        <img src={this.state.userinfo.avatar.small} alt="" />
        <img src={this.state.images.large} alt="" />
        {console.log(this.state.info.images)}
        {console.log(this.state.info.text)}
        {console.log(this.state.info.small)}
        <img src={this.state.info.small} alt="" />
      </div>
    )
  }
}
