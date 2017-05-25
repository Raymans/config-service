import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import DeployConfigsComponent from './components/DeployConfigsComponent'
import {GET_DEPLOYMENT_CONFIGS} from 'actions/deployConfigs'

class DeployConfigs extends Component {
  static propTypes = {
    deploymentConfigs: PropTypes.array,
    getDeploymentConfigs: PropTypes.func.isRequired,
    match: PropTypes.object
  }

  componentDidMount () {
    const {appName} = this.props.match.params
    this.props.getDeploymentConfigs(appName)
  }

  render () {
    let {deploymentConfigs, match} = this.props
    const appName = match.params.appName
    let props = {deploymentConfigs, appName}

    return (
      <div>
        <DeployConfigsComponent {...props} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {deploymentConfigs: state.deployConfigs.deploymentConfigs}
}

function mapDispatchToProps (dispatch) {
  return {
    getDeploymentConfigs: async(appName) => {
      let result = await dispatch(GET_DEPLOYMENT_CONFIGS(appName))
      return dispatch(result)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeployConfigs)
