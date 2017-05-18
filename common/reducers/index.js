import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { layout } from './layout'
import { inbox } from './inbox'
import { auth } from './auth'
import { loginCR } from './login_component_reducer'
import { dashboard } from './dashboard'
import { deployConfig } from './deployConfig'

export const rootReducer = combineReducers({
  layout,
  inbox,
  auth,
  dashboard,
  deployConfig,
  loginCR,
  routing: routerReducer
})
