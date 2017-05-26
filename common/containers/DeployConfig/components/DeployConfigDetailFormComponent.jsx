import React, {PureComponent} from 'react'
import {Grid, Button, Form, Segment, Label, Input} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {Breadcrumb, Title} from 'components'
import SideMenuComponent from './SideMenuComponent'

export default class DeployConfigDetailFormComponent extends PureComponent {
  static propTypes = {
    breadcrumbProps: PropTypes.obj,
    titleProps: PropTypes.obj,
    isStickyMenu: PropTypes.bool,
    deploymentConfig: PropTypes.obj,
    activeSideMenuItem: PropTypes.string,
    handleSideMenuClick: PropTypes.func,
    sideMenuStateChange: PropTypes.func,
    handleCancelClick: PropTypes.func,
    isCreateMode: PropTypes.bool,
    handleInputChange: PropTypes.func,
    handleRemovePortMappings: PropTypes.func,
    handleAddPortMappings: PropTypes.func,
    handleAddHealthChecks: PropTypes.func,
    handleRemoveHealthChecks: PropTypes.func,
    handleAddEnvVariable: PropTypes.func,
    handleSubmit: PropTypes.func
  }

  MbInputFiled = (props) => (
    <Input
      label={{basic: true, content: 'MB', color: 'teal'}}
      labelPosition='right'
      placeholder='diskSpace'
      name="diskSpaceInMb"
      onChange={props.onChange}
      value={props.value}
    />
  )

  render () {
    const {
      breadcrumbProps,
      titleProps,
      isStickyMenu,
      activeSideMenuItem,
      handleSideMenuClick,
      handleCancelClick,
      isCreateMode,
      handleInputChange,
      handleRemovePortMappings,
      handleAddPortMappings,
      handleAddHealthChecks,
      handleRemoveHealthChecks,
      handleAddEnvVariable,
      sideMenuStateChange,
      handleSubmit,
      deploymentConfig
    } = this.props
    const {
      newEnvName, memory, instances, cpus, diskSpaceInMb, constraints, consulUrl,
      nexusConfiguration: nexus = {},
      dockerConfiguration: docker = {},
      marathonConfiguration: marathon = {},
      tempEnvVariables = [],
      healthChecks = []
    } = deploymentConfig
    const {groupId, artifactId, repositoryName, artifactType, baseUrl} = nexus
    const {dockerRegistryUrl, imageName, pullImageOnEveryLaunch, networkType, portMappings} = docker
    const {marathonUrl, marathonUser, marathonPassword} = marathon

    return (
      <div>
        <Breadcrumb {...breadcrumbProps} />
        <Title {...titleProps}/>
        <Grid>
          <Grid.Column width={2}>
            <SideMenuComponent activeItem={activeSideMenuItem} handleMenuClick={handleSideMenuClick} isSticky={isStickyMenu}
                               stateChange={sideMenuStateChange}/>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <Form onSubmit={handleSubmit}>
              <Button.Group widths='3'>
                <Button type="button" onClick={handleCancelClick}>Cancel</Button>
                <Button.Or />
                <Button primary>Save</Button>
              </Button.Group>
              <Segment id="basic">
                <Label as='a' color='red' size="large" ribbon>Basic</Label>
                {isCreateMode &&
                <Form.Input label='Env Name' placeholder='Env Name' name="newEnvName" value={newEnvName}
                            onChange={handleInputChange} required/>
                }
                <Form.Group widths='equal'>
                  <Form.Input label='memory' placeholder='Memory' name="memory" value={memory}
                              onChange={handleInputChange} required/>
                  <Form.Input label='instances' placeholder='instances' name="instances" value={instances}
                              onChange={handleInputChange} required/>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='cpus' placeholder='cpus' name="cpus" value={cpus}
                              onChange={handleInputChange} required/>
                  <Form.Input control={this.MbInputFiled} label='diskSpace'
                              value={diskSpaceInMb} onChange={handleInputChange} required/>
                </Form.Group>
                <Form.Input label='constraints' placeholder='constraints' name="constraints" value={constraints}
                            onChange={handleInputChange} required/>
                <Form.Input label='consulUrl' placeholder='consulUrl' name="consulUrl" value={consulUrl}
                            onChange={handleInputChange}/>
              </Segment>
              <Segment id="nexus">
                <Label as='a' color='grey' size="large" ribbon>Nexus</Label>
                <Form.Input label='groupId' placeholder='groupId' name="nexusConfiguration.groupId" value={groupId}
                            onChange={handleInputChange} required/>
                <Form.Input label='artifactId' placeholder='artifactId' name="nexusConfiguration.artifactId"
                            value={artifactId}
                            onChange={handleInputChange} required/>
                <Form.Input label='repositoryName' placeholder='repositoryName' name="nexusConfiguration.repositoryName"
                            value={repositoryName}
                            onChange={handleInputChange} required/>
                <Form.Input label='artifactType' placeholder='artifactType' name="nexusConfiguration.artifactType"
                            value={artifactType}
                            onChange={handleInputChange} required/>
                <Form.Input label='baseUrl' placeholder='baseUrl' name="nexusConfiguration.baseUrl" value={baseUrl}
                            onChange={handleInputChange}/>
              </Segment>
              <Segment id="docker">
                <Label as='a' color='blue' size="large" ribbon>Docker</Label>
                <Form.Input label='imageName' placeholder='imageName' name="dockerConfiguration.imageName"
                            value={imageName}
                            onChange={handleInputChange} required/>
                <Form.Input label='dockerRegistryUrl' placeholder='dockerRegistryUrl'
                            name="dockerConfiguration.dockerRegistryUrl" value={dockerRegistryUrl}
                            onChange={handleInputChange} required/>
                <Form.Input label='pullImageOnEveryLaunch' placeholder='pullImageOnEveryLaunch'
                            name="dockerConfiguration.pullImageOnEveryLaunch" value={pullImageOnEveryLaunch}
                            onChange={handleInputChange} required/>
                <Form.Input label='networkType' placeholder='networkType' name="dockerConfiguration.networkType"
                            value={networkType}
                            onChange={handleInputChange} required/>
                <div className="required field"><label>portMappings</label></div>
                {portMappings && portMappings.map((mapping, i) =>
                  <Segment>
                    <Button key={i} circular icon="minus" color="red" type="button" index={i}
                            onClick={handleRemovePortMappings}/>
                    <Form.Group widths='equal'>
                      <Form.Input label='containerPort' placeholder='containerPort'
                                  name={`dockerConfiguration.portMappings[${i}].containerPort`}
                                  value={mapping.containerPort}
                                  onChange={handleInputChange} required/>
                      <Form.Input label='hostPort' placeholder='hostPort'
                                  name={`dockerConfiguration.portMappings[${i}].hostPort`} value={mapping.hostPort}
                                  onChange={handleInputChange} required/>
                      <Form.Input label='protocol' placeholder='protocol'
                                  name={`dockerConfiguration.portMappings[${i}].protocol`} value={mapping.protocol}
                                  onChange={handleInputChange} required/>
                    </Form.Group>
                  </Segment>
                )}
                <Button circular icon="add" color="blue" type="button" onClick={handleAddPortMappings}/>
              </Segment>

              <Segment id="marathon">
                <Label as='a' color='olive' size="large" ribbon>Marathon</Label>
                <Form.Input label='marathonUrl' placeholder='marathonUrl' name="marathonConfiguration.marathonUrl"
                            value={marathonUrl}
                            onChange={handleInputChange} required/>
                <Form.Input label='marathonUser' placeholder='marathonUser' name="marathonConfiguration.marathonUser"
                            value={marathonUser}
                            onChange={handleInputChange} required/>
                <Form.Input label='marathonPassword' placeholder='marathonPassword'
                            name="marathonConfiguration.marathonPassword" value={marathonPassword}
                            onChange={handleInputChange} required/>
              </Segment>

              <Segment id="envVariables">
                <Label as='a' color='green' size="large" ribbon>Env Variables</Label>
                {tempEnvVariables && tempEnvVariables.map((key, i) =>
                  <Form.Group widths='equal'>
                    <Form.Input label={i === 0 && 'Key'} placeholder='Key' name={`tempEnvVariables[${i}].key`}
                                value={tempEnvVariables[i].key}
                                onChange={handleInputChange}/>
                    <Form.Input label={i === 0 && 'Value'} placeholder='Value' name={`tempEnvVariables[${i}].value`}
                                value={tempEnvVariables[i].value}
                                onChange={handleInputChange}/>
                  </Form.Group>
                )}
                <Button circular icon="add" color="blue" type="button" onClick={handleAddEnvVariable}/>
              </Segment>

              <Segment id="healthChecks">
                <Label as='a' color='red' size="large" ribbon>Health Checks</Label>
                {healthChecks && healthChecks.map((data, index) => {
                  return (
                    <Segment>
                      <Button key={index} circular icon="minus" color="red" type="button" index={index}
                              onClick={handleRemoveHealthChecks}/>
                      <Form.Input label='protocol' placeholder='protocol' name={`healthChecks[${index}].protocol`}
                                  value={data.protocol}
                                  onChange={handleInputChange} required/>
                      <Form.Input label='command' placeholder='command' name={`healthChecks[${index}].command`}
                                  value={data.command}
                                  onChange={handleInputChange} required/>
                      <Form.Input label='gracePeriodSeconds' placeholder='gracePeriodSeconds'
                                  name={`healthChecks[${index}].gracePeriodSeconds`} value={data.gracePeriodSeconds}
                                  onChange={handleInputChange} required/>
                      <Form.Input label='intervalSeconds' placeholder='intervalSeconds'
                                  name={`healthChecks[${index}].intervalSeconds`} value={data.intervalSeconds}
                                  onChange={handleInputChange} required/>
                      <Form.Input label='timeoutSeconds' placeholder='timeoutSeconds'
                                  name={`healthChecks[${index}].timeoutSeconds`} value={data.timeoutSeconds}
                                  onChange={handleInputChange} required/>
                      <Form.Input label='maxConsecutiveFailures' placeholder='maxConsecutiveFailures'
                                  name={`healthChecks[${index}].maxConsecutiveFailures`}
                                  value={data.maxConsecutiveFailures}
                                  onChange={handleInputChange} required/>
                    </Segment>
                  )
                })}
                <Button circular icon="add" color="blue" type="button" onClick={handleAddHealthChecks}/>
              </Segment>

              <Button.Group widths='3'>
                <Button type="button" onClick={handleCancelClick}>Cancel</Button>
                <Button.Or />
                <Button primary>Save</Button>
              </Button.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
