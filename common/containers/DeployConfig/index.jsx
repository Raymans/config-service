import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon, Menu, Header, Breadcrumb, Grid, Segment, Form} from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' }
]

class DeployConfig extends Component {
  static propTypes = {}
  state = {activeItem: 'bio'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleChange = (e, { value }) => this.setState({ value })

  render () {
    const {value, activeItem} = this.state

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider/>
          <Breadcrumb.Section link>Applications</Breadcrumb.Section>
          <Breadcrumb.Divider/>
          <Breadcrumb.Section active>Deployment Configurations</Breadcrumb.Section>
        </Breadcrumb>

        <Header as='h1'>
          <Icon name='plug'/>
          <Header.Content>
            Staging
          </Header.Content>
        </Header>

        <Grid>
          <Grid.Column width={2}>
            <Menu fluid vertical tabular>
              <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick}/>
              <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick}/>
              <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick}/>
              <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick}/>
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input label='First name' placeholder='First name' />
                  <Form.Input label='Last name' placeholder='Last name' />
                  <Form.Select label='Gender' options={options} placeholder='Gender' />
                </Form.Group>
                <Form.Group inline>
                  <label>Size</label>
                  <Form.Radio label='Small' value='sm' checked={value === 'sm'} onChange={this.handleChange} />
                  <Form.Radio label='Medium' value='md' checked={value === 'md'} onChange={this.handleChange} />
                  <Form.Radio label='Large' value='lg' checked={value === 'lg'} onChange={this.handleChange} />
                </Form.Group>
                <Form.TextArea label='About' placeholder='Tell us more about you...' />
                <Form.Checkbox label='I agree to the Terms and Conditions' />
                <Form.Button>Submit</Form.Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeployConfig)
