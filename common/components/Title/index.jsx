import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Header, Icon} from 'semantic-ui-react'

export default class TitleComponent extends Component {
  static propTypes = {
    icon: PropTypes.string,
    content: PropTypes.string
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const {icon, content} = this.props

    return (
      <Header as='h2'>
        <Icon name={icon}/>
        <Header.Content>
          {content}
        </Header.Content>
      </Header>
    )
  }
}
