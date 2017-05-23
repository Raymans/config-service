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
    const buildRows = (data) => {
      if (!data) {
        return (<Table.Row><Table.Cell ></Table.Cell>
          <Table.Cell></Table.Cell></Table.Row>)
      }
      return Object.keys(data).map(function (key) {
        if (_.isArray(data[key])) {
          return data[key].map((val, i) => {
            let cell = <Table.Cell>{val}</Table.Cell>

            if (_.isObject(val)) {
              cell = (
                <Table.Cell className="ignored" style={{'border-left': '1px solid rgba(34, 36, 38, 0.15)'}}>
                  {Object.keys(val).map((k) =>
                    <Label>
                      {k}
                      <Label.Detail>{val[k]}</Label.Detail>
                    </Label>
                  )}
                </Table.Cell>)
            }
            if (i === 0) {
              return (
                <Table.Row>
                  <Table.Cell width={4} rowSpan={data[key].length}>{key}</Table.Cell>
                  {cell}
                </Table.Row>
              )
            }
            return (
              <Table.Row>
                {cell}
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
    }

    return (
      <Segment>
        <Label as='a' ribbon size="large" color={titleColor}>{title}</Label>
        {data && data.map((d) => {
          if (data.length === 0) {
            return (
              <Table definition>
                <Table.Body>
                  {buildRows(d)}
                </Table.Body>
              </Table>
            )
          }
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
