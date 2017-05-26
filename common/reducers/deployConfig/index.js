import {
  GET_DEPLOYMENT_CONFIG_SUCCESS,
  GET_DEPLOYMENT_CONFIG_FAIL,
  UPDATE_DEPLOYMENT_CONFIG_SUCCESS,
  UPDATE_DEPLOYMENT_CONFIG_FAIL,
  CREATE_DEPLOYMENT_CONFIG_SUCCESS,
  CREATE_DEPLOYMENT_CONFIG_FAIL,
  DELETE_DEPLOYMENT_CONFIG_SUCCESS,
  DELETE_DEPLOYMENT_CONFIG_FAIL,
  CHANGE_INPUT_FILED,
  CHANGE_TO_EDIT_MODE,
  CHANGE_TO_VIEW_MODE,
  NORMAL_SIDE_MENU,
  STICKY_SIDE_MENU,
  CHANGE_ACTIVE_SIDE_MENU_ITEM
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
  },
  isLoading: true,
  activeSideMenuItem: 'basic'
}

const reduceEnvVariablesForInputForm = (envVariables) => {
  return envVariables &&
    _.map(envVariables, (key, val) => {
      return {key: val, value: key}
    })
}
export function deployConfig (state = initialState, action) {
  switch (action.type) {
    case GET_DEPLOYMENT_CONFIG_SUCCESS:
    case UPDATE_DEPLOYMENT_CONFIG_SUCCESS:
    case CREATE_DEPLOYMENT_CONFIG_SUCCESS:
      action.result.tempEnvVariables = reduceEnvVariablesForInputForm(action.result.envVariables)
      return {
        ...state,
        deploymentConfig: action.result,
        isLoading: false
      }
    case DELETE_DEPLOYMENT_CONFIG_SUCCESS:
      return {
        ...state,
        backToList: true
      }
    case CHANGE_INPUT_FILED:
      let dc = _.cloneDeep(state.deploymentConfig)
      _.set(dc, action.name, action.value)
      return {
        ...state,
        deploymentConfig: dc
      }
    case CHANGE_TO_EDIT_MODE:
      return {
        ...state,
        isEditMode: true
      }
    case CHANGE_TO_VIEW_MODE:
      return {
        ...state,
        isEditMode: false,
        isLoading: true
      }
    case STICKY_SIDE_MENU:
      return {
        ...state,
        isStickyMenu: true
      }
    case NORMAL_SIDE_MENU:
      return {
        ...state,
        isStickyMenu: false
      }
    case CHANGE_ACTIVE_SIDE_MENU_ITEM:
      return {
        ...state,
        activeSideMenuItem: action.value
      }
    case GET_DEPLOYMENT_CONFIG_FAIL:
    case UPDATE_DEPLOYMENT_CONFIG_FAIL:
    case CREATE_DEPLOYMENT_CONFIG_FAIL:
    case DELETE_DEPLOYMENT_CONFIG_FAIL:
      return {
        ...state,
        isLoading: false
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
