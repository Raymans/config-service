import {getDeploymentConfigAPI} from 'api/StatisticsSvc'
import {resultOK} from 'api/utils'

// define action types
export const GET_DEPLOYMENT_CONFIG_SUCCESS = 'GET_DEPLOYMENT_CONFIG_SUCCESS'
export const GET_DEPLOYMENT_CONFIG_FAIL = 'GET_DEPLOYMENT_CONFIG_FAIL'

export function GET_DEPLOYMENT_CONFIG (appName, envName) {
  return async () => {
    let result = await getDeploymentConfigAPI(appName, envName)
    if (!resultOK(result)) {
      return {type: GET_DEPLOYMENT_CONFIG_FAIL, error: result.data}
    }
    return {type: GET_DEPLOYMENT_CONFIG_SUCCESS, result: result.data}
  }
}
