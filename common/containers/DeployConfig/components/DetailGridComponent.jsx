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
    const {title, data, titleColor, ...props} = this.props
    const buildRows = (data) => {
      if (!data) {
        return (<Table.Row><Table.Cell ></Table.Cell><Table.Cell></Table.Cell></Table.Row>)
      }
      return _.map(data, (rowValue, rowKey) => {
        // supports string array or object array, if object array will be rendered as label map
        if (_.isArray(rowValue)) {
          return rowValue.map((val, i) => {
            let cell = <Table.Cell>{val}</Table.Cell>
            // if row's value is a array of object, build labels for a cell like portMappings data
            // otherwise just table cell
            if (_.isObject(val)) {
              cell = (
                <Table.Cell className="ignored">
                  {_.map(val, (v, k) =>
                    <Label>
                      {k}
                      <Label.Detail>{v}</Label.Detail>
                    </Label>
                  )}
                </Table.Cell>)
            }
            return (
              <Table.Row>
                {i === 0 &&
                <Table.Cell width={4} rowSpan={rowValue.length}>{rowKey}</Table.Cell>
                }
                {cell}
              </Table.Row>
            )
          })
        }
        return (
          <Table.Row>
            <Table.Cell width={4}>{rowKey}</Table.Cell>
            <Table.Cell>{rowValue}</Table.Cell>
          </Table.Row>
        )
      })
    }

    return (
      <Segment {...props}>
        <Label as='a' ribbon size="large" color={titleColor}>{title}</Label>
        {data && data.map((d) => {
          return (
            <Segment>
              <Table definition>
                <Table.Body>
                  {buildRows(d)}
                </Table.Body>
              </Table>
            </Segment>
          )
        })}
      </Segment>
    )
  }
}
