import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'
import _ from 'lodash'
import './Header.scss'

export default class Header extends Component {
  shouldComponentUpdate (nextProps) {
    return !_.isEqual(nextProps, this.props)
  }

  static propTypes = {
    title: PropTypes.string,
    toggleSidebar: PropTypes.func
    // isLoggedIn: PropTypes.bool
  }

  render () {
    let {title} = this.props

    return (
      <header>
        <div className="header-inner">
            <span className="navicon">
              <Icon name="dashboard" color="blue" />
            </span>
          <span className="title">
            {title}
          </span>
          <span className="spacer" />
        </div>
      </header>
    )
  }
}
