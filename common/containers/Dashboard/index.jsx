import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import DashboardComponent from './components'
import {GET_DEPLOYMENT_CONFIGS} from 'actions/dashboard'

class Dashboard extends Component {
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
        <DashboardComponent {...props} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {deploymentConfigs: state.dashboard.deploymentConfigs}
}

function mapDispatchToProps (dispatch) {
  return {
    getDeploymentConfigs: async() => {
      let result = await dispatch(GET_DEPLOYMENT_CONFIGS)
      dispatch(result)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
