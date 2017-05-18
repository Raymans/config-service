import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import DashboardComponent from './components'
import {GET_DEPLOYMENT_CONFIGS} from 'actions/dashboard'

class Dashboard extends Component {
  static propTypes = {
    deploymentConfigs: PropTypes.array,
    getDeploymentConfigs: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getDeploymentConfigs()
  }

  render () {
    let {deploymentConfigs} = this.props
    let props = {deploymentConfigs}

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
