import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { layout } from './layout'
import { inbox } from './inbox'
import { auth } from './auth'
import { loginCR } from './login_component_reducer'
import { deployConfigs } from './deployConfigs'
import { deployConfig } from './deployConfig'

export const rootReducer = combineReducers({
  layout,
  inbox,
  auth,
  deployConfigs,
  deployConfig,
  loginCR,
  routing: routerReducer
})
