import {get} from './utils'

export async function getDeploymentConfigsAPI (appName = 'springmaven') {
  return get(`http://config-service-sys.digitalriverws.net/rest/deploymentConfiguration/${appName}`)
}

export async function getDeploymentConfigAPI (appName = 'springmaven', envName = 'nonprod') {
  return get(`http://config-service-sys.digitalriverws.net/rest/deploymentConfiguration/${appName}/${envName}`)
}
