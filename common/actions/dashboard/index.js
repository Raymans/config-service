import {getDeploymentConfigsAPI} from 'api/StatisticsSvc'
import {resultOK} from 'api/utils'

// define action types
export const GET_DEPLOYMENT_CONFIGS_SUCCESS = 'GET_DEPLOYMENT_CONFIGS_SUCCESS'
export const GET_DEPLOYMENT_CONFIGS_FAIL = 'GET_DEPLOYMENT_CONFIGS_FAIL'

export const GET_DEPLOYMENT_CONFIGS = async() => {
  let result = await getDeploymentConfigsAPI()
  if (!resultOK(result)) {
    return {type: GET_DEPLOYMENT_CONFIGS_FAIL, error: result.data}
  }
  return {type: GET_DEPLOYMENT_CONFIGS_SUCCESS, result: result.data}
}
