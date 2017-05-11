import React, {Component} from 'react'
import {Segment, Button} from 'semantic-ui-react'
import {Breadcrumb, Title, Table} from 'components'
import SearchComponent from 'components/common/SearchComponent'

export default class DashboardComponent extends Component {
  render () {
    const breadcrumbProps = {navPaths: ['HOME', 'APPLICATION', 'Deployment Config']}
    const titleProps = {icon: 'cloud', content: 'Application: Staging'}
    const tableProps = {
      sortable: true,
      headers: ['Memory', 'Instances', 'Cpus', 'DiskSpaceInMb', 'Constraints', 'ConsulUrl'],
      rows: [
        [1024, 1, 2, 1024, 'hostname:GROUP_BY:1', ''],
        [1024, 1, 2, 1024, 'hostname:GROUP_BY:1', ''],
        [1024, 1, 2, 1024, 'hostname:GROUP_BY:1', ''],
        [1024, 1, 2, 1024, 'hostname:GROUP_BY:1', ''],
        [1024, 1, 2, 1024, 'hostname:GROUP_BY:1', ''],
        [1024, 1, 2, 1024, 'hostname:GROUP_BY:1', '']
      ]
    }
    return (
      <div>
        <Breadcrumb {...breadcrumbProps} />
        <Title {...titleProps}/>

        <Segment basic floated='left'>
          <Button icon='file' color='blue' content='Create'/>
        </Segment>
        <SearchComponent />
        <Table {...tableProps} />
      </div>
    )
  }
}
