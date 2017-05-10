import React, {Component} from 'react'
import {Input, Icon, Menu, Table, Header, Breadcrumb, Segment, Button} from 'semantic-ui-react'

export default class DashboardComponent extends Component {
  render () {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle'/>
          <Breadcrumb.Section link>Applications</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle'/>
          <Breadcrumb.Section active>Deployment Configurations</Breadcrumb.Section>
        </Breadcrumb>

        <Header as='h1'>
          <Icon name='cloud'/>
          <Header.Content>
            Application: Staging
          </Header.Content>
        </Header>

        <Segment basic floated='left'>
          <Button icon='file' color='blue' content='Create'/>
        </Segment>
        <Segment basic floated='right'>
          <Input
            floated='right'
            size='small'
            icon={{name: 'search', circular: true, link: true}}
            placeholder='Search...'
          />
        </Segment>

        <Table celled sortable color="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Memory</Table.HeaderCell>
              <Table.HeaderCell>Instances</Table.HeaderCell>
              <Table.HeaderCell>Cpus</Table.HeaderCell>
              <Table.HeaderCell>DiskSpaceInMb</Table.HeaderCell>
              <Table.HeaderCell>Constraints</Table.HeaderCell>
              <Table.HeaderCell>ConsulUrl</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='right'>1024</Table.Cell>
              <Table.Cell textAlign='right'>1</Table.Cell>
              <Table.Cell textAlign='right'>2</Table.Cell>
              <Table.Cell textAlign='right'>1024</Table.Cell>
              <Table.Cell>hostname:GROUP_BY:1</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>1024</Table.Cell>
              <Table.Cell textAlign='right'>1</Table.Cell>
              <Table.Cell textAlign='right'>2</Table.Cell>
              <Table.Cell textAlign='right'>1024</Table.Cell>
              <Table.Cell>hostname:GROUP_BY:1</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>1024</Table.Cell>
              <Table.Cell textAlign='right'>1</Table.Cell>
              <Table.Cell textAlign='right'>2</Table.Cell>
              <Table.Cell textAlign='right'>1024</Table.Cell>
              <Table.Cell>hostname:GROUP_BY:1</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
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
      </div>
    )
  }
}
