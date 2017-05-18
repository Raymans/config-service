import {get} from './utils'

export async function getDeploymentConfigsAPI (app = 'springmaven') {
  return get(`http://config-service-sys.digitalriverws.net/rest/deploymentConfiguration/${app}`)
}

export async function getDeploymentConfigAPI (app = 'springmaven', envName = 'nonprod') {
  return get(`http://config-service-sys.digitalriverws.net/rest/deploymentConfiguration/${app}/${envName}`)
}
