import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb as SUIBreadcrumb} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class BreadcrumbComponent extends Component {
  static propTypes = {
    navs: PropTypes.array
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const {navs} = this.props

    let breadcrumbs = navs.map(({name, url}, i, arr) => {
      if ((arr.length - 1) === i) {
        return <SUIBreadcrumb.Section active>{name}</SUIBreadcrumb.Section>
      }
      return (
        <span>
          <SUIBreadcrumb.Section link key={i}>
            <NavLink
              to={url}>{name}</NavLink>
          </SUIBreadcrumb.Section>
          <SUIBreadcrumb.Divider icon='right angle'/>
        </span>
      )
    })
    return (
      <SUIBreadcrumb>{breadcrumbs}</SUIBreadcrumb>
    )
  }
}
