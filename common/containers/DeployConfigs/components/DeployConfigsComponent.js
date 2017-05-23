import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Segment, Button, Dimmer, Loader, Divider} from 'semantic-ui-react'
import {Breadcrumb, Title, Table} from 'components'
import SearchComponent from 'components/common/SearchComponent'
import {NavLink} from 'react-router-dom'

export default class DeployConfigsComponent extends Component {
  static propTypes = {
    deploymentConfigs: PropTypes.array,
    appName: PropTypes.string
  }

  render () {
    const {deploymentConfigs, appName} = this.props
    const breadcrumbProps = {
      navs: [
        {name: 'HOME', url: '/'},
        {name: 'APPLICATION', url: '/'},
        {name: 'Deployment Configurations'}
      ]
    }
    const titleProps = {icon: 'cloud', content: `Application: ${appName}`}
    let propsCreateBtn = {
      as: NavLink,
      to: `/apps/${appName}/deploy-configs/create`
    }

    let rows = deploymentConfigs.map((dc) => {
      const {envName, deploymentConfiguration: c} = dc
      return [envName, c.memory, c.instances, c.cpus, c.diskSpaceInMb, c.constraints]
    }
    )

    const tableProps = {
      sortable: true,
      headers: ['Env Name', 'Memory', 'Instances', 'Cpus', 'DiskSpaceInMb', 'Constraints'],
      rows: rows,
      prefixDetailLink: `/apps/${appName}/deploy-configs`
    }
    let noDeploymentConfigs = !deploymentConfigs || deploymentConfigs.length === 0
    return (
      <div>
        <Breadcrumb {...breadcrumbProps} />
        <Title {...titleProps}/>

        <Segment basic floated='left'>
          <Button icon='file' color='blue' content='Create' {...propsCreateBtn}/>
        </Segment>
        <SearchComponent />
        <Divider clearing/>
        <Segment basic>
          {noDeploymentConfigs &&
          <Dimmer active inverted>
            <Loader />
          </Dimmer>}
          <Table {...tableProps} />
        </Segment>
      </div>
    )
  }
}
