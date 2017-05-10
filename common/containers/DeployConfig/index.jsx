import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon, Menu, Header, Breadcrumb, Grid, Segment, Form, Input, Button, Label, Table, Divider} from 'semantic-ui-react'
import {appRouting} from 'routing'

class DeployConfig extends Component {
  static propTypes = {}
  state = {activeItem: 'basic'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleChange = (e, {value}) => this.setState({value})

  InputExampleRightLabeledBasic = () => (
    <Input
      label={{basic: true, content: 'MB', color: 'teal'}}
      labelPosition='right'
      placeholder='diskSpace'
    />
  )

  render () {
    const {value, activeItem} = this.state
    const matchedRoutes = appRouting.filter(a => a.path === location.pathname)
    const header = (
      <Header as='h1'>
        <Icon name='cloud'/>
        <Header.Content>{matchedRoutes[0].isEditMode ? 'Create' : 'Staging'}</Header.Content>
      </Header>
    )
    const breadcrumb = (
      <Breadcrumb>
        <Breadcrumb.Section link>Home</Breadcrumb.Section>
        <Breadcrumb.Divider/>
        <Breadcrumb.Section link>Applications</Breadcrumb.Section>
        <Breadcrumb.Divider/>
        <Breadcrumb.Section active>Deployment Configurations</Breadcrumb.Section>
      </Breadcrumb>
    )
    if (!matchedRoutes[0].isEditMode) {
      return (
        <div>
          {breadcrumb}
          {header}

          <Grid>
            <Grid.Column width={2}>
              <Menu fluid vertical tabular>
                <Menu.Item name='basic' active={activeItem === 'basic'} onClick={this.handleItemClick}/>
                <Menu.Item name='nexus' active={activeItem === 'nexus'} onClick={this.handleItemClick}/>
                <Menu.Item name='docker' active={activeItem === 'docker'} onClick={this.handleItemClick}/>
                <Menu.Item name='marathon' active={activeItem === 'marathon'} onClick={this.handleItemClick}/>
                <Menu.Item name='envVariables' active={activeItem === 'envVariables'} onClick={this.handleItemClick}/>
                <Menu.Item name='healthChecks' active={activeItem === 'healthChecks'} onClick={this.handleItemClick}/>
              </Menu>
            </Grid.Column>

            <Grid.Column width={12}>
              <Button.Group floated='right'>
                <Button icon="delete" color='red' content='Delete'/>
                <Button.Or />
                <Button icon="file" color='blue' content='Create'/>
              </Button.Group>
              <Divider fitted clearing/>
                <Segment>

                  <Label as='a' color='black' ribbon size="large">Overview</Label>
                  <Table definition>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell collapsing>memory</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>instances</Table.Cell>
                        <Table.Cell>instances</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>cpus</Table.Cell>
                        <Table.Cell>cpus</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>diskSpace</Table.Cell>
                        <Table.Cell>diskSpace</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>constraints</Table.Cell>
                        <Table.Cell>constraints</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>consulUrl</Table.Cell>
                        <Table.Cell>consulUrl</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Segment>
              <Segment>
                <Label as='a' color='grey' size="large" ribbon>Nexus</Label>
                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>groupId</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>artifactId</Table.Cell>
                      <Table.Cell>instances</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>repositoryName</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>artifactType</Table.Cell>
                      <Table.Cell>diskSpace</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>baseUrl</Table.Cell>
                      <Table.Cell>constraints</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>
              <Segment>
                <Label as='a' color='blue' size="large" ribbon>Docker</Label>
                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>imageName</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>dockerRegistryUrl</Table.Cell>
                      <Table.Cell>instances</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>pullImageOnEveryLaunch</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>networkType</Table.Cell>
                      <Table.Cell>diskSpace</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>containerPort</Table.Cell>
                      <Table.Cell>diskSpace</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>hostPort</Table.Cell>
                      <Table.Cell>diskSpace</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>protocol</Table.Cell>
                      <Table.Cell>diskSpace</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>
              <Segment>
                <Label as='a' color='olive' size="large" ribbon>Marathon</Label>
                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>marathonUrl</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>marathonUser</Table.Cell>
                      <Table.Cell>instances</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>marathonPassword</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>

              <Segment>
                <Label as='a' color='green' size="large" ribbon>Env Variables</Label>
                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>SERVICE_NAME</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>SERVICE_TAGS</Table.Cell>
                      <Table.Cell>instances</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>SPRING_PROFILES_ACTIVE</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>SERVICE_REGION</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>SERVICE_FAULTZONE</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>SERVICE_CHECK_HTTP</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>SERVICE_CHECK_INTERVAL</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>SERVICE_CHECK_TIMEOUT</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>spring_cloud_client_hostname</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>eureka_instance_non-secure-port</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>

              <Segment>
                <Label as='a' color='red' size="large" ribbon>Health Checks</Label>
                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>protocol</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>command</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>gracePeriodSeconds</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>intervalSeconds</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>timeoutSeconds</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>maxConsecutiveFailures</Table.Cell>
                      <Table.Cell>cpus</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
          </Grid>

        </div>
      )
    }
    // const {isEditMode} = this.props
    // if (!isEditMode) {
    //   return (<div></div>)
    // }

    return (
      <div>
        {breadcrumb}
        {header}

        <Grid>
          <Grid.Column width={2}>
            <Menu fluid vertical tabular>
              <Menu.Item name='basic' active={activeItem === 'basic'} onClick={this.handleItemClick}/>
              <Menu.Item name='nexus' active={activeItem === 'nexus'} onClick={this.handleItemClick}/>
              <Menu.Item name='docker' active={activeItem === 'docker'} onClick={this.handleItemClick}/>
              <Menu.Item name='marathon' active={activeItem === 'marathon'} onClick={this.handleItemClick}/>
              <Menu.Item name='envVariables' active={activeItem === 'envVariables'} onClick={this.handleItemClick}/>
              <Menu.Item name='healthChecks' active={activeItem === 'healthChecks'} onClick={this.handleItemClick}/>
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Form>
              <Segment>
                <Label as='a' color='red' size="large" ribbon>Overview</Label>
                <Form.Group widths='equal'>
                  <Form.Input label='memory' placeholder='Memory' required/>
                  <Form.Input label='instances' placeholder='instances' required/>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='cpus' placeholder='cpus' required/>
                  <Form.Input control={this.InputExampleRightLabeledBasic} label='diskSpace' placeholder='diskSpace'
                              required/>
                </Form.Group>

                <Form.Input label='constraints' placeholder='constraints' required/>
                <Form.Input label='consulUrl' placeholder='consulUrl'/>
                <Form.Group inline>
                  <label>Size</label>
                  <Form.Radio label='Small' value='sm' checked={value === 'sm'} onChange={this.handleChange}/>
                  <Form.Radio label='Medium' value='md' checked={value === 'md'} onChange={this.handleChange}/>
                  <Form.Radio label='Large' value='lg' checked={value === 'lg'} onChange={this.handleChange}/>
                </Form.Group>
                <Form.TextArea label='About' placeholder='Tell us more about you...'/>
                <Form.Checkbox label='I agree to the Terms and Conditions'/>
              </Segment>
              <Header/>
              <Header as='h3'>
                <Icon name='plug'/>
                <Header.Content>Nexus</Header.Content>
              </Header>
              <Segment>
                <Form.Input label='groupId' placeholder='groupId' required/>
                <Form.Input label='artifactId' placeholder='artifactId' required/>
                <Form.Input label='repositoryName' placeholder='repositoryName' required/>
                <Form.Input label='artifactType' placeholder='artifactType' required/>
                <Form.Input label='baseUrl' placeholder='baseUrl'/>
              </Segment>

              <Header as='h3'>
                <Icon name='plug'/>
                <Header.Content>Docker</Header.Content>
              </Header>
              <Segment>
                <Form.Input label='imageName' placeholder='imageName' required/>
                <Form.Input label='dockerRegistryUrl' placeholder='dockerRegistryUrl' required/>
                <Form.Input label='pullImageOnEveryLaunch' placeholder='pullImageOnEveryLaunch' required/>
                <Form.Input label='networkType' placeholder='networkType' required/>
                <Segment>
                  <Form.Input label='containerPort' placeholder='containerPort' required/>
                  <Form.Input label='hostPort' placeholder='hostPort' required/>
                  <Form.Input label='protocol' placeholder='protocol' required/>
                </Segment>

              </Segment>

              <Header as='h3'>
                <Icon name='plug'/>
                <Header.Content>Marathon</Header.Content>
              </Header>
              <Segment>
                <Form.Input label='marathonUrl' placeholder='marathonUrl' required/>
                <Form.Input label='marathonUser' placeholder='marathonUser' required/>
                <Form.Input label='marathonPassword' placeholder='marathonPassword' required/>
              </Segment>

              <Header as='h3'>
                <Icon name='plug'/>
                <Header.Content>Env Variables</Header.Content>
              </Header>
              <Segment>
                <Form.Input label='SERVICE_NAME' placeholder='SERVICE_NAME' required/>
                <Form.Input label='SERVICE_TAGS' placeholder='SERVICE_TAGS' required/>
                <Form.Input label='SPRING_PROFILES_ACTIVE' placeholder='SPRING_PROFILES_ACTIVE' required/>
                <Form.Input label='SERVICE_REGION' placeholder='SERVICE_REGION' required/>
                <Form.Input label='SERVICE_FAULTZONE' placeholder='SERVICE_FAULTZONE' required/>
                <Form.Input label='SERVICE_CHECK_HTTP' placeholder='SERVICE_CHECK_HTTP' required/>
                <Form.Input label='SERVICE_CHECK_INTERVAL' placeholder='SERVICE_CHECK_INTERVAL' required/>
                <Form.Input label='SERVICE_CHECK_TIMEOUT' placeholder='SERVICE_CHECK_TIMEOUT' required/>
                <Form.Input label='spring_cloud_client_hostname' placeholder='spring_cloud_client_hostname' required/>
                <Form.Input label='eureka_instance_non-secure-port' placeholder='eureka_instance_non-secure-port'
                            required/>
              </Segment>

              <Header as='h3'>
                <Icon name='plug'/>
                <Header.Content>Health Checks</Header.Content>
              </Header>
              <Segment>
                <Segment>
                  <Form.Input label='protocol' placeholder='protocol' required/>
                  <Form.Input label='command' placeholder='command' required/>
                  <Form.Input label='gracePeriodSeconds' placeholder='gracePeriodSeconds' required/>
                  <Form.Input label='intervalSeconds' placeholder='intervalSeconds' required/>
                  <Form.Input label='timeoutSeconds' placeholder='timeoutSeconds' required/>
                  <Form.Input label='maxConsecutiveFailures' placeholder='maxConsecutiveFailures' required/>
                </Segment>
              </Segment>

              <Button.Group>
                <Button>Cancel</Button>
                <Button.Or />
                <Button primary>Save</Button>
              </Button.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeployConfig)
