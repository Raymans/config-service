import {get, put, post, del} from './utils'

export async function getDeploymentConfigsAPI (appName = 'springmaven') {
  return get(`http://config-service-sys.digitalriverws.net/rest/deploymentConfiguration/${appName}`)
}

export async function getDeploymentConfigAPI (appName = 'springmaven', envName = 'nonprod') {
  return get(`http://config-service-sys.digitalriverws.net/rest/deploymentConfiguration/${appName}/${envName}`)
}

export async function updateDeploymentConfigAPI (appName = 'springmaven', envName = 'nonprod', data) {
  return put(`http://config-service-sys.digitalriverws.net/rest/deploymentConfiguration/${appName}/${envName}`, data)
}

export async function createDeploymentConfigAPI (appName = 'springmaven', envName = 'nonprod', data) {
  return post(`http://config-service-sys.digitalriverws.net/rest/deploymentConfiguration/${appName}/${envName}`, data)
}

export async function deleteDeploymentConfigAPI (appName = 'springmaven', envName = 'nonprod') {
  return del(`http://config-service-sys.digitalriverws.net/rest/deploymentConfiguration/${appName}/${envName}`)
}
