import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import bismillah from '../../assets/image/bismillah.png'
import { connect } from 'react-redux'

class Surah extends Component {
    state = {
        id: 0,
        data: [],
        ayat: [],
        datas: [],
        surat_selanjutnya: 0,
        surat_sebelumnya: 0,
    }

    componentDidMount() {
        console.log(this.state)
        // console.log(this.props.surat_selanjutnya)
        const id = this.props.match.params.id
        
        this.setState({
            id: id
        })
        
        if(localStorage.getItem(id)) {
            const LS = JSON.parse(localStorage.getItem(id));
            console.log(LS)
            this.setState({
                data: LS.data,
                datas: LS.datas,
                ayat: LS.ayat,
                // surat_sebelumnya: LS.data.surat_sebelumnya,
                // surat_selanjutnya: LS.data.surat_selanjutnya
            })
        }else{

            // update state id
            this.setState({
                id: id
            })

            axios.get(`https://api.alquran.cloud/v1/surah/${id}`)
                .then(res => {
                    this.setState({
                        ayat: res.data.data.ayahs
                    })
                    // console.log(res.data.data)
                })
                .catch(error => console.log(error))

            // console.log(this.props.match.params.id)
            axios.get(`https://equran.id/api/surat/${id}`)
                .then((res) => {
                    this.setState({
                        data: res.data,
                        datas: res.data.ayat, //berfungsi menyimpan data ayat yang berada di dalam data
                        // surat_selanjutnya: res.data.surat_selanjutnya,
                        // surat_sebelumnya: res.data.surat_sebelumnya
                    })
                    console.log(res.data.surat_selanjutnya)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    parseDescription = () => {
        return {__html: this.state.data.deskripsi};
    }

    render() {
        console.log(this.props.updateSurah(this.state.id))
        // console.log(this.props.surat_selanjutnya)
        
        // save data to localeStorage
        // console.log(typeof this.state.data.length);
        if(this.state.data != [] && this.state.data.length != 0) {
            localStorage.setItem(this.state.id, JSON.stringify({
                data: this.state.data,
                datas: this.state.datas,
                ayat: this.state.ayat
            }))
        }

        return(
            <Fragment>
                <Container className="mt-3">
                    <div className="bg-light text-center">
                        <h3>{this.state.data.nama}</h3>
                        <h6>{this.state.data.arti}</h6>
                        <Button size="sm" variant="success">{this.state.data.tempat_turun}</Button><br/>
                        <strong>Jumlah ayat: {this.state.data.jumlah_ayat}</strong>
                    </div>
                        <hr />
                    <p className="text-justify">
                        <span dangerouslySetInnerHTML={this.parseDescription()} />
                    </p>
                        <hr />
                    <div className="text-center" xs={2} md={5}>
                        <Image src={bismillah} fluid /><br/>
                        Dengan menyebut nama Allah yang Maha Pengasih lagi Maha Penyayang
                    </div>
                        <hr />
                    {
                        this.state.ayat.map((ayat, index) => {
                                return(
                                <div key={index}>
                                    <Container className="text-right mt-5" fluid>
                                        <Row className="no-gutters">
                                            <Col>
                                                {(ayat.text.substr(0, 37) == "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيم") 
                                                    ? ayat.text.substr(38)
                                                    : ayat.text}<br/><br/>
                                                <span className="text-left">
                                                    {this.state.datas[index].idn}
                                                </span>
                                            </Col>
                                            <Col sm={1}>
                                                <Button variant="success">{ayat.numberInSurah}</Button>
                                            </Col>
                                        </Row>
                                        <hr />
                                    </Container>
                                </div>
                            )
                        })
                    }
                </Container>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        surat_selanjutnya: state.nextSurah,
        surat_sebelumnya: state.prevSurah
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSurah: id => dispatch({ type: 'UPDATE_SURAH', nextSurah: (Number(id) + 1), prevSurah: (Number(id) - 1), showNav: true})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Surah))