import React, { Component, Fragment } from "react";

class FooterComp extends Component {
    state = {
        author: 'Muhamad Syahrul Ramadhan',
        email: 'msyahrulr12@gmail.com',
        github: 'https://github.com/msyahrulr12'
    }

    render() {
        return (
            <Fragment>
                {/* Footer */}
                <footer class="page-footer font-small teal py-3 bg-success text-white">
                    {/* Copyright */}
                    <div class="footer-copyright text-center py-3">Developed By : &nbsp;
                        <a href={this.state.github} className="font-weight-bold text-white" target="blank">Muhamad Syahrul Ramadhan</a>
                    </div>
                    {/* Copyright */}

                </footer>
                {/* Footer */}
            </Fragment>
        )
    }
}

export default FooterComp
