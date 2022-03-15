import React, { Component } from 'react'
import { Table } from 'antd'
import { getArticlesList } from '../../requests'
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '操作',
    dataIndex: 'address',
    key: 'options'
  }
]

export default class ArticleList extends Component {
  componentDidMount() {
    getArticlesList().then(response => {
      console.log(response)
    })
  }
  render() {
    return (
      <div>
        ArticleList
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    )
  }
}
