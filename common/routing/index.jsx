import React from 'react'
import {Route, Redirect, Switch} from 'react-router'
import {createBrowserHistory} from 'history'
import {App, Inbox, Dashboard, Login, DeployConfig} from 'containers'
import {RouteAuth} from 'components'

export const history = getHistory()

const DeployConfigEdit = props => {
  return (
    <DeployConfig isEditMode {...props} />
  )
}

export const appRouting = [
  {
    path: '/application',
    name: 'Application',
    exact: true,
    icon: 'archive',
    // sidebarVisible: true,
    tag: RouteAuth,
    component: Inbox
  },
  {
    path: '/inbox',
    name: 'Resources',
    tag: RouteAuth,
    component: Inbox
  },
  {
    path: '/auth',
    name: 'Auth',
    tag: Route,
    component: Login
  },
  {
    path: '/apps/:appName/deploy-configs/create',
    name: 'Deploy Config - Create',
    tag: Route,
    component: DeployConfigEdit
  },
  {
    path: '/apps/:appName/deploy-configs/:envName',
    name: 'Deploy Config Detail',
    tag: Route,
    component: DeployConfig
  },
  {
    path: '/apps/:appName/deploy-configs',
    name: 'Deploy Configs',
    tag: RouteAuth,
    component: Dashboard
  }

]

/**
 * Returns application routing with protected by AuthCheck func routes
 * @param {Function} authCheck checks is user logged in
 */
export const Routing = authCheck => {
  // remove components that aren't application routes, (e.g. github link in sidebar)
  let routes = appRouting.filter(a => a.tag || a.component)
  // render components that are inside Switch (main view)
  let routesRendered = routes.map((a, i) => {
    // get tag for Route. is it RouteAuth `protected route` or Route?
    let Tag = a.tag
    let {path, exact, strict, component} = a
    // can visitor access this route?
    let canAccess = authCheck
    // select only props that we need
    let b = {path, exact, strict, component, canAccess}
    return <Tag key={i} {...b} />
  })

  return (
    <App>
      <Switch>
        {routesRendered}
        <Redirect to="/apps/springmaven/deploy-configs"/>
      </Switch>
    </App>
  )
}

function getHistory () {
  const basename = process.env.BUILD_DEMO ? '/react-semantic.ui-starter' : ''

  return createBrowserHistory({basename})
}
