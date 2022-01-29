import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
const FA = require('react-fontawesome')

class NavbarComp extends Component {
    state = {
        next: '',
        prev: ''
    }

    componentDidMount() {
        console.log(this.props)
        console.log(this.props.prev)
    }

    updateNavSurah = () => {
        this.props.updateNavSurah()
    }

    redirectPage = () => {
        // alert('yeah')
        this.props.history.push(`/surah/1`)
    }

    render() {
        return(
            <Navbar bg="success" className="navbar-dark p-3">
                <Navbar.Brand>
                    <Link to="/" onClick={this.props.updateNavSurah.bind(this)} className="text-decoration-none text-light">
                        <b>Qur'anKu</b>
                    </Link>
                </Navbar.Brand>
                { this.props.showNav !== false && (
                    <Nav className="ml-auto text-white">
                        <Nav.Link className="border-right" href={(this.props.prev === 0) ? '/' : '/surah/'+this.props.prev}>
                            <FA name="arrow-left" /> Previous
                        </Nav.Link>
                        <Nav.Link href={`/surah/${this.props.next}`}>
                            Next <FA name="arrow-right" />
                        </Nav.Link>
                    </Nav>
                ) }
            </Navbar>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        next: state.nextSurah,
        prev: state.prevSurah,
        showNav: state.showNav
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNavSurah: () => dispatch({ type: 'UPDATE_SURAH', showNav: false })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarComp))
