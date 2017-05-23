import {
  GET_DEPLOYMENT_CONFIG_SUCCESS,
  GET_DEPLOYMENT_CONFIG_FAIL,
  CHANGE_INPUT_FILED,
  UPDATE_DEPLOYMENT_CONFIG_SUCCESS,
  CHANGE_TO_EDIT_MODE,
  CHANGE_TO_VIEW_MODE
} from 'actions/deployConfig'
import {LOCATION_CHANGE} from 'actions/common'
import _ from 'lodash'

export const initialState = {
  deploymentConfig: {
    dockerConfiguration: {
      portMappings: [{
        containerPort: '',
        hostPort: '',
        protocol: ''
      }]
    },
    healthChecks: [{
      protocol: '',
      command: '',
      gracePeriodSeconds: 0,
      intervalSeconds: 0,
      timeoutSeconds: 0,
      maxConsecutiveFailures: 0
    }],
    envVariables: {},
    tempEnvVariables: [{key: '', value: ''}]
  }
}

export function deployConfig (state = initialState, action) {
  switch (action.type) {
    case GET_DEPLOYMENT_CONFIG_SUCCESS:
      const envVariables = action.result.envVariables &&
        _.map(action.result.envVariables, (key, val) => {
          return {key: val, value: key}
        })
      action.result.tempEnvVariables = envVariables
      return {
        ...state,
        deploymentConfig: action.result
      }
    case CHANGE_INPUT_FILED:
      let dc = _.cloneDeep(state.deploymentConfig)
      _.set(dc, action.name, action.value)
      return {
        ...state,
        deploymentConfig: dc
      }
    case UPDATE_DEPLOYMENT_CONFIG_SUCCESS:
      return {
        ...state,
        deploymentConfig: action.result
      }
    case GET_DEPLOYMENT_CONFIG_FAIL:
      return state
    case CHANGE_TO_EDIT_MODE:
      return {
        ...state,
        isEditMode: true
      }
    case CHANGE_TO_VIEW_MODE:
      return {
        ...state,
        isEditMode: false
      }
    case LOCATION_CHANGE: {
      if (action.payload.pathname !== '/') {
        return initialState
      }
      return state
    }
    default:
      return state
  }
}
