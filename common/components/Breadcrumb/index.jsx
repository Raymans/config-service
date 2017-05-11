import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb as SUIBreadcrumb} from 'semantic-ui-react'

export default class Breadcrumb extends Component {
  static propTypes = {
    navPaths: PropTypes.array
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const {navPaths} = this.props

    let paths = navPaths.map((path, i, arr) => {
      if ((arr.length - 1) === i) {
        return <SUIBreadcrumb.Section active>{path}</SUIBreadcrumb.Section>
      }
      return (
        <span>
          <SUIBreadcrumb.Section link key={i}>{path}</SUIBreadcrumb.Section>
          <SUIBreadcrumb.Divider icon='right angle'/>
        </span>
      )
    })
    return (
      <SUIBreadcrumb>
        {paths}

      </SUIBreadcrumb>
    )
  }
}
