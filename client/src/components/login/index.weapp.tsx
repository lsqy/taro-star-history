import Taro, { Component } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"

export default class Login extends Component {
  state = {
    context: {},
    starInfomation: {}
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: "login_test",
        data: {}
      })
      .then(res => {
        this.setState({
          context: res.result
        })
      })
  }

  getStarList() {
    Taro.cloud.callFunction({
      name: 'github_api',
      data: {
        repo: 'lsqy/taro-music'
      }
    }).then(res => {
      this.setState({
        starInfomation: res.result
      })
    })
  }

  render() {
    const { starInfomation, context } = this.state
    return (
      <View className='index'>
        <Button onClick={this.getLogin}>获取登录云函数</Button>
        <Button onClick={this.getStarList}>获取star列表</Button>
        <View>context：{JSON.stringify(context, null, 4)}</View>
        <View>starInfomation: {JSON.stringify(starInfomation, null, 4)}</View>
      </View>
    )
  }
}
