import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Grid, Segment, Form, Input, Button, Label} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {Breadcrumb, Title} from 'components'
import DetailGridComponent from './components/DetailGridComponent'
import {GET_DEPLOYMENT_CONFIG, UPDATE_INPUT_FIELD, CHANGE_MODE} from 'actions/deployConfig'
import {updateDeploymentConfigAPI, createDeploymentConfigAPI, deleteDeploymentConfigAPI} from 'api/DeployConfigSvc'

class DeployConfigDetail extends Component {
  static propTypes = {
    isCreateMode: PropTypes.bool,
    isEditMode: PropTypes.bool,
    deploymentConfig: PropTypes.object,
    getDeploymentConfig: PropTypes.func.isRequired,
    updateInputField: PropTypes.func.isRequired,
    enterEditMode: PropTypes.func.isRequired,
    enterViewMode: PropTypes.func.isRequired,
    match: PropTypes.object,
    history: PropTypes.object
  }
  state = {activeItem: 'basic'}

  handleEditClick = () => this.props.enterEditMode()

  handleCancelClick = () => {
    if (this.props.isCreateMode) {
      this.props.history.replace('')
      return
    }
    this.props.enterViewMode()
  }

  handleDeleteClick= e => {
    e.preventDefault()
    const {envName, appName} = this.props.match.params
    deleteDeploymentConfigAPI(appName, envName)
    this.props.history.replace('')
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleChange = (e, {name, value}) => {
    this.props.updateInputField(name, value)
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.props.isCreateMode) {
      const {appName} = this.props.match.params
      const {newEnvName, ...deploymentConfig} = this.props.deploymentConfig
      createDeploymentConfigAPI(appName, newEnvName, deploymentConfig)
    } else {
      const {envName, appName} = this.props.match.params
      updateDeploymentConfigAPI(appName, envName, this.props.deploymentConfig)
    }
    this.props.enterViewMode()
  }

  componentDidMount () {
    if (this.props.isCreateMode) {
      return
    }
    const {appName, envName} = this.props.match.params
    this.props.getDeploymentConfig(appName, envName)
  }

  InputExampleRightLabeledBasic = (props) => (
    <Input
      label={{basic: true, content: 'MB', color: 'teal'}}
      labelPosition='right'
      placeholder='diskSpace'
      name="diskSpaceInMb"
      onChange={this.handleChange}
      value={props.value}
    />
  )

  render () {
    const {activeItem} = this.state
    const {isEditMode, isCreateMode, deploymentConfig = {}} = this.props
    const {
      newEnvName, memory, instances, cpus, diskSpaceInMb, constraints, consulUrl,
      nexusConfiguration: nexus = {},
      dockerConfiguration: docker = {},
      marathonConfiguration: marathon = {},
      envVariables = {},
      healthChecks = []} =
     deploymentConfig
    const {groupId, artifactId, repositoryName, artifactType, baseUrl} = nexus
    const {dockerRegistryUrl, imageName, pullImageOnEveryLaunch, networkType, portMappings} = docker
    const {marathonUrl, marathonUser, marathonPassword} = marathon
    const {
      SERVICE_NAME, SERVICE_TAGS, SPRING_PROFILES_ACTIVE, SERVICE_REGION, SERVICE_FAULTZONE, SERVICE_CHECK_HTTP, SERVICE_CHECK_INTERVAL,
      SERVICE_CHECK_TIMEOUT, spring_cloud_client_hostname: springCloudClientHostname, 'eureka_instance_non-secure-port': eurekaInstanceNonSecurePort} = envVariables

    const {envName = 'Create', appName} = this.props.match.params
    const breadcrumbProps = {
      navs: [
        {name: 'HOME', url: '/'},
        {name: 'APPLICATION', url: '/'},
        {name: 'Deployment Configurations', url: `/apps/${appName}/deploy-configs`},
        {name: envName}
      ]
    }
    const titleProps = {icon: 'cloud', content: isEditMode ? 'Create' : envName}
    if (!isEditMode && !isCreateMode) {
      const gridsProps = {
        overview: {
          title: 'Overview',
          data: [{memory, instances, cpus, diskSpaceInMb, constraints}],
          titleColor: 'black'
        },
        nexus: {
          title: 'Nexus',
          data: [{groupId, artifactId, repositoryName, artifactType}],
          titleColor: 'grey'
        },
        docker: {
          title: 'Docker',
          data: [{dockerRegistryUrl, imageName, pullImageOnEveryLaunch, networkType, portMappings}],
          titleColor: 'blue   '
        },
        marathon: {
          title: 'Marathon',
          data: [{marathonUrl, marathonUser, marathonPassword}],
          titleColor: 'olive'
        },
        envVariables: {
          title: 'Env Variables',
          data: [{
            SERVICE_NAME,
            SERVICE_TAGS,
            SPRING_PROFILES_ACTIVE,
            SERVICE_REGION,
            SERVICE_CHECK_HTTP,
            SERVICE_CHECK_INTERVAL,
            SERVICE_CHECK_TIMEOUT,
            springCloudClientHostname,
            eurekaInstanceNonSecurePort
          }],
          titleColor: 'green'
        },
        healthChecks: {
          title: 'Health Checks',
          data: healthChecks,
          titleColor: 'red'
        }
      }
      return (
        <div>
          <Breadcrumb {...breadcrumbProps} />
          <Title {...titleProps}/>
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
              <Button.Group widths='3'>
                <Button icon="delete" color='red' content='Delete' onClick={this.handleDeleteClick}/>
                <Button.Or />
                <Button icon="file" color='blue' content='Edit' onClick={this.handleEditClick}/>
              </Button.Group>
              <DetailGridComponent {...gridsProps.overview}/>
              <DetailGridComponent {...gridsProps.nexus}/>
              <DetailGridComponent {...gridsProps.docker}/>
              <DetailGridComponent {...gridsProps.marathon}/>
              <DetailGridComponent {...gridsProps.envVariables}/>
              <DetailGridComponent {...gridsProps.healthChecks}/>
              <Button.Group widths='3'>
                <Button icon="delete" color='red' content='Delete' onClick={this.handleDeleteClick}/>
                <Button.Or />
                <Button icon="file" color='blue' content='Edit' onClick={this.handleEditClick}/>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
    return (
      <div>
        <Breadcrumb {...breadcrumbProps} />
        <Title {...titleProps}/>
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
            <Form onSubmit={this.handleSubmit}>
              <Button.Group widths='3'>
                <Button type="button" onClick={this.handleCancelClick}>Cancel</Button>
                <Button.Or />
                <Button primary>Save</Button>
              </Button.Group>
              <Segment>
                <Label as='a' color='red' size="large" ribbon>Overview</Label>
                {isCreateMode &&
                <Form.Input label='Env Name' placeholder='Env Name' name="newEnvName" value={newEnvName}
                            onChange={this.handleChange} required/>
                }
                <Form.Group widths='equal'>
                  <Form.Input label='memory' placeholder='Memory' name="memory" value={memory}
                              onChange={this.handleChange} required/>
                  <Form.Input label='instances' placeholder='instances' name="instances" value={instances}
                              onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='cpus' placeholder='cpus' name="cpus" value={cpus}
                              onChange={this.handleChange} required/>
                  <Form.Input control={this.InputExampleRightLabeledBasic} label='diskSpace'
                              value={diskSpaceInMb}
                              onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Input label='constraints' placeholder='constraints' name="constraints" value={constraints}
                            onChange={this.handleChange} required/>
                <Form.Input label='consulUrl' placeholder='consulUrl' name="consulUrl" value={consulUrl}
                            onChange={this.handleChange}/>
              </Segment>
              <Segment>
                <Label as='a' color='grey' size="large" ribbon>Nexus</Label>
                <Form.Input label='groupId' placeholder='groupId' name="nexusConfiguration.groupId" value={groupId}
                            onChange={this.handleChange} required/>
                <Form.Input label='artifactId' placeholder='artifactId' name="nexusConfiguration.artifactId"
                            value={artifactId}
                            onChange={this.handleChange} required/>
                <Form.Input label='repositoryName' placeholder='repositoryName' name="nexusConfiguration.repositoryName"
                            value={repositoryName}
                            onChange={this.handleChange} required/>
                <Form.Input label='artifactType' placeholder='artifactType' name="nexusConfiguration.artifactType"
                            value={artifactType}
                            onChange={this.handleChange} required/>
                <Form.Input label='baseUrl' placeholder='baseUrl' name="nexusConfiguration.baseUrl" value={baseUrl}
                            onChange={this.handleChange}/>
              </Segment>
              <Segment>
                <Label as='a' color='blue' size="large" ribbon>Docker</Label>
                <Form.Input label='imageName' placeholder='imageName' name="dockerConfiguration.imageName" value={imageName}
                            onChange={this.handleChange} required/>
                <Form.Input label='dockerRegistryUrl' placeholder='dockerRegistryUrl' name="dockerConfiguration.dockerRegistryUrl" value={dockerRegistryUrl}
                            onChange={this.handleChange} required/>
                <Form.Input label='pullImageOnEveryLaunch' placeholder='pullImageOnEveryLaunch' name="dockerConfiguration.pullImageOnEveryLaunch" value={pullImageOnEveryLaunch}
                            onChange={this.handleChange} required/>
                <Form.Input label='networkType' placeholder='networkType' name="dockerConfiguration.networkType" value={networkType}
                            onChange={this.handleChange} required/>
                {portMappings && portMappings.map((mapping, i) =>
                   <Segment>
                     <Form.Group widths='equal'>
                       <Form.Input label='containerPort' placeholder='containerPort' name={`dockerConfiguration.portMappings[{i}].containerPort`} value={mapping.containerPort}
                                   onChange={this.handleChange} required/>
                       <Form.Input label='hostPort' placeholder='hostPort' name={`dockerConfiguration.portMappings[{i}].hostPort`} value={mapping.hostPort}
                                   onChange={this.handleChange} required/>
                       <Form.Input label='protocol' placeholder='protocol' name={`dockerConfiguration.portMappings[{i}].protocol`} value={mapping.protocol}
                                   onChange={this.handleChange} required/>
                     </Form.Group>
                  </Segment>
                )}
              </Segment>

              <Segment>
                <Label as='a' color='olive' size="large" ribbon>Marathon</Label>
                <Form.Input label='marathonUrl' placeholder='marathonUrl' name="marathonConfiguration.marathonUrl" value={marathonUrl}
                            onChange={this.handleChange} required/>
                <Form.Input label='marathonUser' placeholder='marathonUser' name="marathonConfiguration.marathonUser" value={marathonUser}
                            onChange={this.handleChange} required/>
                <Form.Input label='marathonPassword' placeholder='marathonPassword' name="marathonConfiguration.marathonPassword" value={marathonPassword}
                            onChange={this.handleChange} required/>
              </Segment>

              <Segment>
                <Label as='a' color='green' size="large" ribbon>Env Variables</Label>
                <Form.Input label='SERVICE_NAME' placeholder='SERVICE_NAME' name="envVariables.SERVICE_NAME" value={SERVICE_NAME}
                            onChange={this.handleChange} required/>
                <Form.Input label='SERVICE_TAGS' placeholder='SERVICE_TAGS' name="envVariables.SERVICE_TAGS" value={SERVICE_TAGS}
                            onChange={this.handleChange} required/>
                <Form.Input label='SPRING_PROFILES_ACTIVE' placeholder='SPRING_PROFILES_ACTIVE' name="envVariables.SPRING_PROFILES_ACTIVE" value={SPRING_PROFILES_ACTIVE}
                            onChange={this.handleChange} required/>
                <Form.Input label='SERVICE_REGION' placeholder='SERVICE_REGION' name="envVariables.SERVICE_REGION" value={SERVICE_REGION}
                            onChange={this.handleChange} required/>
                <Form.Input label='SERVICE_FAULTZONE' placeholder='SERVICE_FAULTZONE' name="envVariables.SERVICE_FAULTZONE" value={SERVICE_FAULTZONE}
                            onChange={this.handleChange}/>
                <Form.Input label='SERVICE_CHECK_HTTP' placeholder='SERVICE_CHECK_HTTP' name="envVariables.SERVICE_CHECK_HTTP" value={SERVICE_CHECK_HTTP}
                            onChange={this.handleChange} required/>
                <Form.Input label='SERVICE_CHECK_INTERVAL' placeholder='SERVICE_CHECK_INTERVAL' name="envVariables.SERVICE_CHECK_INTERVAL" value={SERVICE_CHECK_INTERVAL}
                            onChange={this.handleChange} required/>
                <Form.Input label='SERVICE_CHECK_TIMEOUT' placeholder='SERVICE_CHECK_TIMEOUT' name="envVariables.SERVICE_CHECK_TIMEOUT" value={SERVICE_CHECK_TIMEOUT}
                            onChange={this.handleChange} required/>
                <Form.Input label='spring_cloud_client_hostname' placeholder='spring_cloud_client_hostname' name="envVariables.spring_cloud_client_hostname" value={springCloudClientHostname}
                            onChange={this.handleChange} required/>
                <Form.Input label='eureka_instance_non-secure-port' placeholder='eureka_instance_non-secure-port' name="envVariables.eureka_instance_non-secure-port" value={eurekaInstanceNonSecurePort}
                            onChange={this.handleChange} required/>
              </Segment>

              <Segment>
                <Label as='a' color='red' size="large" ribbon>Health Checks</Label>
                {healthChecks && healthChecks.map((data, index) => {
                  return (
                    <Segment>
                      <Form.Input label='protocol' placeholder='protocol' name={`healthChecks[${index}].protocol`}
                                  value={data.protocol}
                                  onChange={this.handleChange} required/>
                      <Form.Input label='command' placeholder='command' name={`healthChecks[${index}].command`} value={data.command}
                                  onChange={this.handleChange} required/>
                      <Form.Input label='gracePeriodSeconds' placeholder='gracePeriodSeconds'
                                  name={`healthChecks[${index}].gracePeriodSeconds`} value={data.gracePeriodSeconds}
                                  onChange={this.handleChange} required/>
                      <Form.Input label='intervalSeconds' placeholder='intervalSeconds'
                                  name={`healthChecks[${index}].intervalSeconds`} value={data.intervalSeconds}
                                  onChange={this.handleChange} required/>
                      <Form.Input label='timeoutSeconds' placeholder='timeoutSeconds'
                                  name={`healthChecks[${index}].timeoutSeconds`} value={data.timeoutSeconds}
                                  onChange={this.handleChange} required/>
                      <Form.Input label='maxConsecutiveFailures' placeholder='maxConsecutiveFailures'
                                  name={`healthChecks[${index}].maxConsecutiveFailures`} value={data.maxConsecutiveFailures}
                                  onChange={this.handleChange} required/>
                    </Segment>
                  )
                })}
              </Segment>

              <Button.Group widths='3'>
                <Button type="button" onClick={this.handleCancelClick}>Cancel</Button>
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
  return {
    deploymentConfig: state.deployConfig.deploymentConfig,
    isEditMode: state.deployConfig.isEditMode
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getDeploymentConfig: async(appName, envName) => {
      let result = await dispatch(GET_DEPLOYMENT_CONFIG(appName, envName))
      return dispatch(result)
    },
    updateInputField: (name, value) =>
      dispatch(UPDATE_INPUT_FIELD(name, value)),
    enterEditMode: () =>
      dispatch(CHANGE_MODE(true)),
    enterViewMode: () =>
      dispatch(CHANGE_MODE(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeployConfigDetail)
