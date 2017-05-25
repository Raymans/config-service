import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import DeployConfigDetailComponent from './components/DeployConfigDetailComponent'
import DeployConfigDetailFormComponent from './components/DeployConfigDetailFormComponent'
import {
  GET_DEPLOYMENT_CONFIG,
  UPDATE_DEPLOYMENT_CONFIG,
  CREATE_DEPLOYMENT_CONFIG,
  DELETE_DEPLOYMENT_CONFIG,
  UPDATE_INPUT_FIELD,
  CHANGE_MODE,
  STICK_SIDE_MENU
} from 'actions/deployConfig'
import _ from 'lodash'
import './DeployConfig.scss'
import {scroller} from 'react-scroll'

class DeployConfigDetail extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isCreateMode: PropTypes.bool,
    isEditMode: PropTypes.bool,
    isStickyMenu: PropTypes.bool,
    deploymentConfig: PropTypes.object,
    getDeploymentConfig: PropTypes.func.isRequired,
    updateDeploymentConfig: PropTypes.func.isRequired,
    createDeploymentConfig: PropTypes.func.isRequired,
    deleteDeploymentConfig: PropTypes.func.isRequired,
    updateInputField: PropTypes.func.isRequired,
    enterEditMode: PropTypes.func.isRequired,
    enterViewMode: PropTypes.func.isRequired,
    changeSideMenuPos: PropTypes.func.isRequired,
    match: PropTypes.object,
    history: PropTypes.object,
    backToList: PropTypes.bool
  }
  state = {activeItem: 'basic'}

  handleAddPortMappings = () => {
    const portMappings = this.props.deploymentConfig.dockerConfiguration.portMappings || []
    portMappings.push({
      'containerPort': '',
      'hostPort': '',
      'protocol': ''
    })
    this.props.updateInputField('dockerConfiguration.portMappings', portMappings)
  }

  handleAddHealthChecks = () => {
    const healthChecks = this.props.deploymentConfig.healthChecks || []
    healthChecks.push({
      protocol: '',
      command: '',
      gracePeriodSeconds: 0,
      intervalSeconds: 0,
      timeoutSeconds: 0,
      maxConsecutiveFailures: 0
    })
    this.props.updateInputField('healthChecks', healthChecks)
  }

  handleAddEnvVariable = () => {
    const tempEnvVariables = this.props.deploymentConfig.tempEnvVariables || []
    tempEnvVariables.push({
      'key': '',
      'value': ''
    })
    this.props.updateInputField('tempEnvVariables', tempEnvVariables)
  }

  handleRemoveHealthChecks = (e, {index}) => {
    const healthChecks = this.props.deploymentConfig.healthChecks || []
    const hcs = _.filter(healthChecks, (p, i) => {
      return i !== index
    })
    this.props.updateInputField('healthChecks', hcs)
  }

  handleRemovePortMappings = (e, {index}) => {
    const portMappings = this.props.deploymentConfig.dockerConfiguration.portMappings || []
    const pms = _.filter(portMappings, (p, i) => {
      return i !== index
    })
    this.props.updateInputField('dockerConfiguration.portMappings', pms)
  }

  handleEditClick = () => this.props.enterEditMode()

  handleCancelClick = () => {
    if (this.props.isCreateMode) {
      this.props.history.replace('')
      return
    }
    // TODO
    const {envName, appName} = this.props.match.params
    this.props.enterViewMode()
    this.props.getDeploymentConfig(appName, envName)
  }

  handleDeleteClick = e => {
    e.preventDefault()
    const {envName, appName} = this.props.match.params
    this.props.deleteDeploymentConfig(appName, envName)
  }

  handleSideMenuClick = (e, {name}) => {
    this.setState({activeItem: name})
    scroller.scrollTo(name, {
      duration: 1000,
      smooth: 'easeInOutQuint',
      offset: -80
    })
  }

  handleInputChange = (e, {name, value}) => {
    this.props.updateInputField(name, value)
  }

  handleSubmit = e => {
    e.preventDefault()
    const {appName} = this.props.match.params
    const {tempEnvVariables, newEnvName, ...deploymentConfig} = this.props.deploymentConfig
    deploymentConfig.envVariables = _.reduce(tempEnvVariables, function (result, data) {
      if (!data.key) return result
      result[data.key] = data.value
      return result
    }, {})
    this.props.enterViewMode()
    if (this.props.isCreateMode) {
      this.props.createDeploymentConfig(appName, newEnvName, deploymentConfig)
      this.props.history.replace(newEnvName)
    } else {
      const {envName, appName} = this.props.match.params
      this.props.updateDeploymentConfig(appName, envName, deploymentConfig)
    }
  }

  componentDidMount () {
    if (this.props.isCreateMode) {
      return
    }
    const {appName, envName} = this.props.match.params
    this.props.getDeploymentConfig(appName, envName)
  }

  sideMenuStateChange (watcher) {
    this.props.changeSideMenuPos(watcher.isAboveViewport)
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.backToList) {
      nextProps.history.replace('')
      return false
    }
    return true
  }

  render () {
    const {activeItem} = this.state
    const {isLoading, isEditMode, isCreateMode, isStickyMenu, deploymentConfig = {}} = this.props
    const {
      memory, instances, cpus, diskSpaceInMb, constraints,
      nexusConfiguration: nexus = {},
      dockerConfiguration: docker = {},
      marathonConfiguration: marathon = {},
      envVariables = {},
      healthChecks = []
    } =
      deploymentConfig
    const {groupId, artifactId, repositoryName, artifactType} = nexus
    const {dockerRegistryUrl, imageName, pullImageOnEveryLaunch, networkType, portMappings} = docker
    const {marathonUrl, marathonUser, marathonPassword} = marathon

    const {envName = 'Create', appName} = this.props.match.params
    const breadcrumbProps = {
      navs: [
        {name: 'HOME', url: '/'},
        {name: 'APPLICATION', url: '/'},
        {name: 'Deployment Configurations', url: `/apps/${appName}/deploy-configs`},
        {name: envName}
      ]
    }
    const titleProps = {icon: 'envira gallery', color: 'green', content: isEditMode ? 'Create' : envName}
    if (!isEditMode && !isCreateMode) {
      const gridsProps = {
        basic: {
          title: 'Basic',
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
          data: [envVariables],
          titleColor: 'green'
        },
        healthChecks: {
          title: 'Health Checks',
          data: healthChecks,
          titleColor: 'red'
        }
      }
      const detailProps = {breadcrumbProps, gridsProps, titleProps, isStickyMenu, activeItem}
      return (
        <DeployConfigDetailComponent
          {...detailProps}
          handleSideMenuClick={this.handleSideMenuClick}
          sideMenuStateChange={::this.sideMenuStateChange}
          handleDeleteClick={this.handleDeleteClick}
          handleEditClick={this.handleEditClick}
          isLoading={isLoading}/>
      )
    }
    const detailFormProps = {breadcrumbProps, deploymentConfig, titleProps, isStickyMenu, activeItem, isCreateMode}
    return (
      <div>
        <DeployConfigDetailFormComponent
          {...detailFormProps}
          handleInputChange={this.handleInputChange}
          handleSideMenuClick={this.handleSideMenuClick}
          sideMenuStateChange={::this.sideMenuStateChange}
          handleRemovePortMappings={this.handleRemovePortMappings}
          handleAddPortMappings={this.handleAddPortMappings}
          handleAddHealthChecks={this.handleAddHealthChecks}
          handleRemoveHealthChecks={this.handleRemoveHealthChecks}
          handleAddEnvVariable={this.handleAddEnvVariable}
          handleSubmit={this.handleSubmit}
          handleCancelClick={this.handleCancelClick}
        />
      </div>

    )
  }
}

function mapStateToProps (state) {
  console.log('mapStateToProps')
  return {
    deploymentConfig: state.deployConfig.deploymentConfig,
    isEditMode: state.deployConfig.isEditMode,
    isStickyMenu: state.deployConfig.isStickyMenu,
    isLoading: state.deployConfig.isLoading,
    backToList: state.deployConfig.backToList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getDeploymentConfig: async(appName, envName) => {
      let result = await dispatch(GET_DEPLOYMENT_CONFIG(appName, envName))
      return dispatch(result)
    },
    updateDeploymentConfig: async(appName, envName, deployConfig) => {
      let result = await dispatch(UPDATE_DEPLOYMENT_CONFIG(appName, envName, deployConfig))
      return dispatch(result)
    },
    createDeploymentConfig: async(appName, envName, deployConfig) => {
      let result = await dispatch(CREATE_DEPLOYMENT_CONFIG(appName, envName, deployConfig))
      return dispatch(result)
    },
    deleteDeploymentConfig: async(appName, envName, deployConfig) => {
      let result = await dispatch(DELETE_DEPLOYMENT_CONFIG(appName, envName, deployConfig))
      return dispatch(result)
    },
    updateInputField: (name, value) =>
      dispatch(UPDATE_INPUT_FIELD(name, value)),
    enterEditMode: () =>
      dispatch(CHANGE_MODE(true)),
    enterViewMode: () =>
      dispatch(CHANGE_MODE(false)),
    changeSideMenuPos: (isSticky) =>
      dispatch(STICK_SIDE_MENU(isSticky))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeployConfigDetail)
