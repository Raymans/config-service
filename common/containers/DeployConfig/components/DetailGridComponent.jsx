import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Segment, Table, Label} from 'semantic-ui-react'

export default class DetailGridComponent extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    titleColor: PropTypes.string
  }

  render () {
    const {title, data, titleColor} = this.props
    if (!data) {
      return (<Table.Row><Table.Cell ></Table.Cell>
        <Table.Cell></Table.Cell></Table.Row>)
    }
    const tableRows = Object.keys(data).map(function (key) {
      return (
        <Table.Row>
          <Table.Cell width={4}>{key}</Table.Cell>
          <Table.Cell>{data[key]}</Table.Cell>
        </Table.Row>
      )
    })

    return (
      <Segment>
        <Label as='a' ribbon size="large" color={titleColor}>{title}</Label>
        <Table definition>
          <Table.Body>
            {tableRows}
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}
