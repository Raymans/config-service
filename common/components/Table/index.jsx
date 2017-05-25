import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class TableComponent extends Component {
  static propTypes = {
    headers: PropTypes.array,
    rows: PropTypes.array,
    prefixDetailLink: PropTypes.string,
    footer: PropTypes.obj

  }

  shouldComponentUpdate () {
    return true
  }

  render () {
    const {headers, rows, prefixDetailLink, footer, ...tableProps} = this.props

    let tableHeaders = headers.map((header, i) =>
      <Table.HeaderCell key={i}>{header}</Table.HeaderCell>
    )
    let tableRows = rows.map((row, i) =>
      <Table.Row>
        {row.map((data, j) => {
          let textAlign = data && data instanceof Number ? 'right' : 'left'
          return (
            <Table.Cell textAlign={textAlign} key={j}>
              <NavLink
                to={`${prefixDetailLink}/${row[0]}`}>{data}</NavLink>
            </Table.Cell>
          )
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
        {footer &&
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan={headers.length}>
              {footer}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
        }
      </Table>
    )
  }
}
