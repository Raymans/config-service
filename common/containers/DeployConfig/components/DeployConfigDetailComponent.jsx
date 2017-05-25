import React, {PureComponent} from 'react'
import {Grid, Button, Dimmer, Loader} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {Breadcrumb, Title} from 'components'
import DetailGridComponent from './DetailGridComponent'
import SideMenuComponent from './SideMenuComponent'

export default class DeployConfigDetailComponent extends PureComponent {
  static propTypes = {
    breadcrumbProps: PropTypes.obj,
    titleProps: PropTypes.obj,
    gridsProps: PropTypes.obj,
    handleDeleteClick: PropTypes.func,
    handleEditClick: PropTypes.func,
    handleSideMenuClick: PropTypes.func,
    sideMenuStateChange: PropTypes.func,
    isStickyMenu: PropTypes.bool,
    activeItem: PropTypes.string,
    titleColor: PropTypes.string,
    isLoading: PropTypes.bool
  }

  render () {
    const {
      breadcrumbProps,
      titleProps,
      gridsProps,
      handleDeleteClick,
      handleEditClick,
      handleSideMenuClick,
      sideMenuStateChange,
      isStickyMenu,
      activeItem,
      isLoading
    } = this.props
    return (
      <div>
        <Breadcrumb {...breadcrumbProps} />
        <Title {...titleProps}/>
        <Grid>
          {isLoading &&
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
          }
          <Grid.Column width={2}>
            <SideMenuComponent activeItem={activeItem} handleMenuClick={handleSideMenuClick} isSticky={isStickyMenu}
                               stateChange={sideMenuStateChange}/>
          </Grid.Column>
          {!isLoading &&
          <Grid.Column width={12}>
            <Button.Group widths='3'>
              <Button icon="delete" color='red' content='Delete' onClick={handleDeleteClick}/>
              <Button.Or />
              <Button icon="file" color='blue' content='Edit' onClick={handleEditClick}/>
            </Button.Group>
            <DetailGridComponent id="basic" {...gridsProps.basic}/>
            <DetailGridComponent id="nexus" {...gridsProps.nexus}/>
            <DetailGridComponent id="docker" {...gridsProps.docker}/>
            <DetailGridComponent id="marathon" {...gridsProps.marathon}/>
            <DetailGridComponent id="envVariables" {...gridsProps.envVariables}/>
            <DetailGridComponent id="healthChecks" {...gridsProps.healthChecks}/>
            <Button.Group widths='3'>
              <Button icon="delete" color='red' content='Delete' onClick={handleDeleteClick}/>
              <Button.Or />
              <Button icon="file" color='blue' content='Edit' onClick={handleEditClick}/>
            </Button.Group>
          </Grid.Column>
          }
        </Grid>
      </div>
    )
  }
}
