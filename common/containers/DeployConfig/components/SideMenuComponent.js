import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Menu} from 'semantic-ui-react'
import { Watch } from 'scrollmonitor-react'

export default Watch(class SideMenuComponent extends PureComponent {
  static propTypes = {
    handleMenuClick: PropTypes.func,
    activeItem: PropTypes.string,
    isSticky: PropTypes.bool
  }

  render () {
    const {handleMenuClick, activeItem, isSticky} = this.props
    return (
      <Menu className={isSticky && 'fixed-menu'} fluid vertical tabular>
        <Menu.Item name='basic' active={activeItem === 'basic'} onClick={handleMenuClick}/>
        <Menu.Item name='nexus' active={activeItem === 'nexus'} onClick={handleMenuClick}/>
        <Menu.Item name='docker' active={activeItem === 'docker'} onClick={handleMenuClick}/>
        <Menu.Item name='marathon' active={activeItem === 'marathon'} onClick={handleMenuClick}/>
        <Menu.Item name='envVariables' active={activeItem === 'envVariables'} onClick={handleMenuClick}/>
        <Menu.Item name='healthChecks' active={activeItem === 'healthChecks'} onClick={handleMenuClick}/>
      </Menu>
    )
  }
})
