import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table, Menu, Icon} from 'semantic-ui-react'

export default class TableComponent extends Component {
  static propTypes = {
    headers: PropTypes.array,
    rows: PropTypes.array

  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const {headers, rows, ...tableProps} = this.props

    let tableHeaders = headers.map((header, i) =>
      <Table.HeaderCell key={i}>{header}</Table.HeaderCell>
    )
    let tableRows = rows.map((row, i) =>
      <Table.Row>
        {row.map((data, j) => {
          let textAlign = data && data instanceof Number ? 'right' : 'left'
          return <Table.Cell textAlign={textAlign} key={j}>{data}</Table.Cell>
        }
        )}
      </Table.Row>
    )
    return (
      <Table {...tableProps} celled color="blue">
        <Table.Header>
          <Table.Row>
            {tableHeaders}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableRows}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='6'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='left chevron'/>
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='right chevron'/>
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}
