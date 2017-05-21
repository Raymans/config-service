import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Segment, Table, Label} from 'semantic-ui-react'
import _ from 'lodash'

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
      if (_.isArray(data[key])) {
        return data[key].map((val, i) => {
          if (i === 0) {
            return (
              <Table.Row>
                <Table.Cell width={4} rowSpan={data[key].length}>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            )
          }
          return (
            <Table.Row>
              <Table.Cell>{val}</Table.Cell>
            </Table.Row>
          )
        })
      }
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
