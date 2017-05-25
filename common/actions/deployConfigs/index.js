import {getDeploymentConfigsAPI} from 'api/DeployConfigSvc'
import {resultOK} from 'api/utils'

// define action types
export const GET_DEPLOYMENT_CONFIGS_SUCCESS = 'GET_DEPLOYMENT_CONFIGS_SUCCESS'
export const GET_DEPLOYMENT_CONFIGS_FAIL = 'GET_DEPLOYMENT_CONFIGS_FAIL'

export function GET_DEPLOYMENT_CONFIGS (appName = 'springmaven') {
  return async() => {
    let result = await getDeploymentConfigsAPI(appName)
    if (!resultOK(result)) {
      return {type: GET_DEPLOYMENT_CONFIGS_FAIL, error: result.data}
    }
    return {type: GET_DEPLOYMENT_CONFIGS_SUCCESS, result: result.data}
  }
}
