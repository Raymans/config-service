import {getDeploymentConfigAPI} from 'api/StatisticsSvc'
import {resultOK} from 'api/utils'

// define action types
export const GET_DEPLOYMENT_CONFIG_SUCCESS = 'GET_DEPLOYMENT_CONFIG_SUCCESS'
export const GET_DEPLOYMENT_CONFIG_FAIL = 'GET_DEPLOYMENT_CONFIG_FAIL'

export const GET_DEPLOYMENT_CONFIG = async() => {
  let result = await getDeploymentConfigAPI()
  if (!resultOK(result)) {
    return {type: GET_DEPLOYMENT_CONFIG_FAIL, error: result.data}
  }
  return {type: GET_DEPLOYMENT_CONFIG_SUCCESS, result: result.data}
}
