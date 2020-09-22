import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

const FilterLink = ({ filter, children }) => {
    return (
        <NavLink
            exact
            // to={`${filter}`}
            to={filter == undefined ? '/' : `/surah/${filter}`}
            activeStyle={{
                textDecoration: 'none',
                color: 'black'
            }}
        >
            {children}
        </NavLink>
    )
}

export default withRouter(connect()(FilterLink))
