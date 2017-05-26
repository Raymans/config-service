import {
  getDeploymentConfigAPI,
  updateDeploymentConfigAPI,
  createDeploymentConfigAPI,
  deleteDeploymentConfigAPI
} from 'api/DeployConfigSvc'
import {resultOK} from 'api/utils'

// define action types
export const GET_DEPLOYMENT_CONFIG_SUCCESS = 'GET_DEPLOYMENT_CONFIG_SUCCESS'
export const GET_DEPLOYMENT_CONFIG_FAIL = 'GET_DEPLOYMENT_CONFIG_FAIL'
export const UPDATE_DEPLOYMENT_CONFIG_SUCCESS = 'UPDATE_DEPLOYMENT_CONFIG_SUCCESS'
export const UPDATE_DEPLOYMENT_CONFIG_FAIL = 'UPDATE_DEPLOYMENT_CONFIG_FAIL'
export const CREATE_DEPLOYMENT_CONFIG_SUCCESS = 'CREATE_DEPLOYMENT_CONFIG_SUCCESS'
export const CREATE_DEPLOYMENT_CONFIG_FAIL = 'CREATE_DEPLOYMENT_CONFIG_FAIL'
export const DELETE_DEPLOYMENT_CONFIG_SUCCESS = 'DELETE_DEPLOYMENT_CONFIG_SUCCESS'
export const DELETE_DEPLOYMENT_CONFIG_FAIL = 'DELETE_DEPLOYMENT_CONFIG_FAIL'
export const CHANGE_INPUT_FILED = 'CHANGE_INPUT_FILED'
export const CHANGE_TO_EDIT_MODE = 'CHANGE_TO_EDIT_MODE'
export const CHANGE_TO_VIEW_MODE = 'CHANGE_TO_VIEW_MODE'
export const STICKY_SIDE_MENU = 'STICKY_SIDE_MENU'
export const NORMAL_SIDE_MENU = 'NORMAL_SIDE_MENU'
export const CHANGE_ACTIVE_SIDE_MENU_ITEM = 'CHANGE_ACTIVE_SIDE_MENU_ITEM'

export function GET_DEPLOYMENT_CONFIG (appName, envName) {
  return async() => {
    let result = await getDeploymentConfigAPI(appName, envName)
    if (!resultOK(result)) {
      return {type: GET_DEPLOYMENT_CONFIG_FAIL, error: result.data}
    }
    return {type: GET_DEPLOYMENT_CONFIG_SUCCESS, result: result.data}
  }
}

export function UPDATE_DEPLOYMENT_CONFIG (appName, envName, deployConfig) {
  return async() => {
    let result = await updateDeploymentConfigAPI(appName, envName, deployConfig)
    if (!resultOK(result)) {
      return {type: UPDATE_DEPLOYMENT_CONFIG_FAIL, error: result.data}
    }
    return {type: UPDATE_DEPLOYMENT_CONFIG_SUCCESS, result: result.data}
  }
}

export function CREATE_DEPLOYMENT_CONFIG (appName, envName, deployConfig) {
  return async() => {
    let result = await createDeploymentConfigAPI(appName, envName, deployConfig)
    if (!resultOK(result)) {
      return {type: CREATE_DEPLOYMENT_CONFIG_FAIL, error: result.data}
    }
    return {type: CREATE_DEPLOYMENT_CONFIG_SUCCESS, result: result.data}
  }
}

export function DELETE_DEPLOYMENT_CONFIG (appName, envName) {
  return async() => {
    let result = await deleteDeploymentConfigAPI(appName, envName)
    console.log(result)
    if (!resultOK(result)) {
      return {type: DELETE_DEPLOYMENT_CONFIG_FAIL, error: result.data}
    }
    return {type: DELETE_DEPLOYMENT_CONFIG_SUCCESS, result: result.data}
  }
}

export const UPDATE_INPUT_FIELD = (name, value) =>
  ({type: CHANGE_INPUT_FILED, name: name, value: value})

export const CHANGE_MODE = (isEditMode) => {
  if (isEditMode) {
    return ({type: CHANGE_TO_EDIT_MODE})
  }
  return ({type: CHANGE_TO_VIEW_MODE})
}

export const STICK_SIDE_MENU = (isStickMode) => {
  if (isStickMode) {
    return ({type: STICKY_SIDE_MENU})
  }
  return ({type: NORMAL_SIDE_MENU})
}

export const ACTIVATE_SIDE_MENU_ITEM = (name) =>
  ({type: CHANGE_ACTIVE_SIDE_MENU_ITEM, value: name})
