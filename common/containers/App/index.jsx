import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
// Accessing PropTypes via the main React package is deprecated.
// Use the prop-types package from npm instead.
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'
import {Dimmer, Sidebar as SidebarSemantic, Container} from 'semantic-ui-react'
import {Header, Sidebar, Footer} from 'components'
import {CLOSE_SIDEBAR, OPEN_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'
import {LOGOUT_AUTH} from 'actions/auth'
import {appRouting} from 'routing'
import './App.scss'
var Scroll = require('react-scroll')

var Link = Scroll.Link
var Element = Scroll.Element
var scroll = Scroll.animateScroll
var durationFn = function (deltaTop) {
  return deltaTop
}
class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // react-router `withRouter` props
    location: PropTypes.object,
    history: PropTypes.object,
    // match can force component to re-render
    match: PropTypes.object,

    // sidebarOpened can force component to re-render
    sidebarOpened: PropTypes.bool,
    closeSidebar: PropTypes.func,
    // isLoggedIn can force component to re-render
    isLoggedIn: PropTypes.bool,
    handleWindowResize: PropTypes.func,
    logout: PropTypes.func,
    checkAuthLogic: PropTypes.func,
    toggleSidebar: PropTypes.func,
    // isMobile can force component to re-render
    isMobile: PropTypes.bool
  }

  // XXX: fix it, I'm tired of this.
  // shouldComponentUpdate(nextProps) {
  //     let {match, isMobile, isLoggedIn, sidebarOpened} = this.props
  //     let matchSame = _.isEqual(nextProps.match, match)
  //     let isMobileSame = _.isEqual(nextProps.isMobile, isMobile)
  //     let isLoggedInSame = _.isEqual(nextProps.isLoggedIn, isLoggedIn)
  //     let sidebarOpenedSame = _.isEqual(nextProps.sidebarOpened, sidebarOpened)
  //     // return props that can force us aren't the same
  //     return !(matchSame && isMobileSame && isLoggedInSame && sidebarOpenedSame)
  // }

  componentWillMount () {
    let {handleWindowResize, isLoggedIn} = this.props
    window.addEventListener('resize', handleWindowResize)
    this.checkAppAuthLogic(isLoggedIn)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     return !_.isEqual(this.props, nextProps) && !_.isEqual(nextState, this.state)
  // }

  /**
     * Call checkAuthLogic
     * @param  {Bool} loggedIn state.auth.loggedIn, current prop
     * @return {Bool} Nothing
     */
  checkAppAuthLogic (loggedIn) {
    let {location, checkAuthLogic} = this.props
    let path = location.pathname
    checkAuthLogic(path, loggedIn)
  }

  componentWillReceiveProps (nextProps) {
    this.checkAppAuthLogic(nextProps.isLoggedIn)
  }

  render () {
    let {
      children,
      sidebarOpened,
      closeSidebar,
      isLoggedIn,
      logout,
      toggleSidebar,
      // location,
      isMobile
    } = this.props

    // must be refactored, if one of your route looks like `/api/users/:id`
    // get currentRoute
    // TODO title for Header
    // const matchedRoutes = appRouting.filter(a => a.path === location.pathname)
    // const currentRoute = matchedRoutes[0] || {}
    // const title = currentRoute.name || ''
    const title = 'Apps Dashboard'
    // routing for sidebar menu
    const sidebarRouting = appRouting.filter(a => a.sidebarVisible).map(a => {
      let {path, name, icon, external, strict, exact} = a
      let b = {path, name, icon, external, strict, exact}
      return b
    })

    let sidebarProps = {
      isMobile,
      logout,
      open: sidebarOpened,
      routing: sidebarRouting
    }

    let headerProps = {
      toggleSidebar,
      title,
      isLoggedIn
    }

    let dimmerProps = {
      active: true,
      onClick: closeSidebar
    }

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >Test 1</Link></li>
                <li><Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500}>Test 2</Link></li>
                <li><Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} >Test 3</Link></li>
                <li><Link activeClass="active" className="test4" to="test4" spy={true} smooth={true} duration={500}>Test 4</Link></li>
                <li><Link activeClass="active" className="test5" to="test5" spy={true} smooth={true} duration={500} delay={1000}>Test 5 ( delay )</Link></li>
                <li><Link activeClass="active" className="test6" to="anchor" spy={true} smooth={true} duration={500}>Test 6 (anchor)</Link></li>
                <li><Link activeClass="active" className="test7" to="test7" spy={true} smooth={true} duration={durationFn}>Test 7 (duration and container)</Link></li>
                <li> <a onClick={() => scroll.scrollTo(100)}>Scroll To 100!</a></li>
                <li> <a onClick={() => scroll.scrollToBottom()}>Scroll To Bottom</a></li>
                <li> <a onClick={() => scroll.scrollMore(500)}>Scroll 500 More!</a></li>
                <li> <a onClick={() => scroll.scrollMore(1000, { delay: 1500 })}>Scroll 1000 More! ( delay ) </a></li>
                <li><Link activeClass="active" className="test8" to="same" spy={true} smooth={true} duration={500}>Same target</Link></li>
                <li><Link activeClass="active" className="test9" to="same" spy={true} smooth={true} duration={500}>Same target</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <Element name="test1" className="element" >
          test 1
        </Element>

        <Element name="test2" className="element">
          test 2
        </Element>

        <Element name="test3" className="element">
          test 3
        </Element>

        <Element name="test4" className="element">
          test 4
        </Element>

        <Element name="test5" className="element">
          test 5
        </Element>

        <div id="anchor" className="element">
          test 6 (anchor)
        </div>

        <Link activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{display: 'inline-block', margin: '20px'}}>
          Go to first element inside container
        </Link>

        <Link activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{display: 'inline-block', margin: '20px'}}>
          Go to second element inside container
        </Link>
        <Element name="test7" className="element" id="containerElement" style={{
          position: 'relative',
          height: '200px',
          overflow: 'scroll',
          marginBottom: '100px'
        }}>
          test 7 (duration and container)

          <Element name="firstInsideContainer" style={{
            marginBottom: '200px'
          }}>
            first element inside container
          </Element>

          <Element name="secondInsideContainer" style={{
            marginBottom: '200px'
          }}>
            second element inside container
          </Element>
        </Element>

        <Element id="same" className="element">
          Two links point to this
        </Element>

        <a onClick={this.scrollToTop}>To the top!</a>

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    sidebarOpened: state.layout.sidebarOpened,
    isMobile: state.layout.isMobile,
    isLoggedIn: state.auth.loggedIn
  }
}

function mapDispatchToProps (dispatch) {
  let resizer
  return {
    closeSidebar: () => {
      dispatch(CLOSE_SIDEBAR())
    },
    logout: () => {
      dispatch(LOGOUT_AUTH())
      dispatch(push('/auth'))
    },
    toggleSidebar: () => {
      dispatch(OPEN_SIDEBAR())
    },
    /**
         * Immediately push to homePath('/'), if user is logged.
         * Can be used for other auth logic checks.
         * Useful, because we don't need to dispatch `push(homePath)` action
         * from `Login` container after LOGIN_AUTH_SUCCESS action
         * @param  {String}  path       [current location path]
         * @param  {Boolean} isLoggedIn [is user logged in?]
         * @return {[type]}             [description]
         */
    checkAuthLogic: (path, isLoggedIn) => {
      let authPath = '/auth'
      let homePath = '/'
      if (isLoggedIn && path === authPath) {
        dispatch(push(homePath))
      }
    },
    handleWindowResize: () => {
      clearTimeout(resizer)
      resizer = setTimeout(() => dispatch(WINDOW_RESIZE()), 100)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
