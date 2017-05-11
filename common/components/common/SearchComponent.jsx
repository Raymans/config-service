import React, {Component} from 'react'
import {Input, Segment} from 'semantic-ui-react'

//
export default class SearchComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  static propTypes = {
  }

  componentWillMount () {
  }

  componentWillReceiveProps () {
  }

  render () {
    return (
      <Segment basic floated='right'>
        <Input
          floated='right'
          size='small'
          icon={{name: 'search', circular: true, link: true}}
          placeholder='Search...'
        />
      </Segment>
    )
  }
}
