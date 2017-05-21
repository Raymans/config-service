import {getDeploymentConfigAPI} from 'api/DeployConfigSvc'
import {resultOK} from 'api/utils'

// define action types
export const GET_DEPLOYMENT_CONFIG_SUCCESS = 'GET_DEPLOYMENT_CONFIG_SUCCESS'
export const GET_DEPLOYMENT_CONFIG_FAIL = 'GET_DEPLOYMENT_CONFIG_FAIL'
export const UPDATE_DEPLOYMENT_CONFIG_SUCCESS = 'UPDATE_DEPLOYMENT_CONFIG_SUCCESS'

export const CHANGE_INPUT_FILED = 'CHANGE_INPUT_FILED'

export const CHANGE_TO_EDIT_MODE = 'CHANGE_TO_EDIT_MODE'
export const CHANGE_TO_VIEW_MODE = 'CHANGE_TO_VIEW_MODE'

export function GET_DEPLOYMENT_CONFIG (appName, envName) {
  return async() => {
    let result = await getDeploymentConfigAPI(appName, envName)
    if (!resultOK(result)) {
      return {type: GET_DEPLOYMENT_CONFIG_FAIL, error: result.data}
    }
    return {type: GET_DEPLOYMENT_CONFIG_SUCCESS, result: result.data}
  }
}

export const UPDATE_INPUT_FIELD = (name, value) =>
  ({type: CHANGE_INPUT_FILED, name: name, value: value})

export function UPDATE_DEPLOYMENT_CONFIG (appName, envName) {
  return async() => {
    let result = await getDeploymentConfigAPI()
    if (!resultOK(result)) {
      return {type: GET_DEPLOYMENT_CONFIG_FAIL, error: result.data}
    }
    return {type: GET_DEPLOYMENT_CONFIG_SUCCESS, result: result.data}
  }
}

export const CHANGE_MODE = (isEditMode) => {
  if (isEditMode) {
    return ({type: CHANGE_TO_EDIT_MODE})
  }
  return ({type: CHANGE_TO_VIEW_MODE})
}
