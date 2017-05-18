import { GET_DEPLOYMENT_CONFIGS_SUCCESS, GET_DEPLOYMENT_CONFIGS_FAIL } from 'actions/dashboard'
import { LOCATION_CHANGE } from 'actions/common'

export const initialState = {
  deploymentConfigs: []
}

export function dashboard (state = initialState, action) {
  switch (action.type) {
    case GET_DEPLOYMENT_CONFIGS_SUCCESS:
      return {
        ...state,
        deploymentConfigs: action.result
      }
    case GET_DEPLOYMENT_CONFIGS_FAIL:
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
