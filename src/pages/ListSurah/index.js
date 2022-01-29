import React, { Fragment, Component } from 'react'
import axios from 'axios'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import './style.css'
import { connect } from 'react-redux'

class ListSurah extends Component {
    state = {
        surah:[]
    }

    componentDidMount() {
        if(JSON.parse(localStorage.getItem('listSurah')).length !== 0) {
            const LS = localStorage.getItem('listSurah')
            this.setState({
                surah: JSON.parse(LS)
            })
        }else{

            axios.get('https://equran.id/api/surat')
                .then((res) => {
                    this.setState({
                        surah: res.data
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
            
        }
    }

    handleSurah = (id) => {
        this.props.history.push(`/surah/${id}`);
    }

    render() {
        if(this.state.surah !== [] || this.state.surah.length !== 0) {
            if(!localStorage.getItem('listSurah') || JSON.parse(localStorage.getItem('listSurah')).length === 0) {
                localStorage.setItem('listSurah', JSON.stringify(this.state.surah))
            }
        }

        return(
            <Container className="mt-4">
                <h2><strong>Daftar Surah</strong></h2>
                <hr />
                {
                    this.state.surah.map((data, index) => {
                        return(
                            <Fragment key={index}>
                                <div className="list-surah-link text-decoration-none text-dark" onClick={() => this.handleSurah(data.nomor)}>
                                    <Card className="my-2">
                                        <Card.Body className="p-3 mt-2">
                                            <Container fluid>
                                                <Row className="no-gutters">
                                                    <Col lg={1}>
                                                        <Button size="lg" className="btn-success">{data.nomor}</Button>
                                                    </Col>
                                                    <Col bg="primary">
                                                        <h6><strong>{data.nama_latin}</strong></h6>
                                                            <div>
                                                                {/* {data.asma}
                                                                <br/> */}
                                                                {data.jumlah_ayat}
                                                                &nbsp;
                                                                -
                                                                &nbsp;
                                                                {data.tempat_turun[0].toUpperCase() + data.tempat_turun.substr(1)}
                                                                &nbsp;
                                                                -
                                                                &nbsp;
                                                                {data.nama}
                                                            </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Fragment>
                            
                        )
                    })
                }
                <hr />
            </Container>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSurah: id => dispatch({ type: 'UPDATE_SURAH', nextSurah: 0, prevSurah: 0, showNav: false })
    }
}

export default connect(null, mapDispatchToProps)(withRouter(ListSurah))
