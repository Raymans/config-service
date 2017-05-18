import { GET_DEPLOYMENT_CONFIG_SUCCESS, GET_DEPLOYMENT_CONFIG_FAIL } from 'actions/deployConfig'
import { LOCATION_CHANGE } from 'actions/common'

export const initialState = {
  deploymentConfigs: []
}

export function deployConfig (state = initialState, action) {
  switch (action.type) {
    case GET_DEPLOYMENT_CONFIG_SUCCESS:
      return {
        ...state,
        deploymentConfig: action.result
      }
    case GET_DEPLOYMENT_CONFIG_FAIL:
      return state
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
