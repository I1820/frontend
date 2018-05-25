import React, { Component } from 'react';
import { streamFetch } from '../api';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button,
    UncontrolledTooltip
} from 'reactstrap';
import ReactTable from 'react-table'
import ReactJson from 'react-json-view'
import Loading from './Loading'
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class GatewayLogger extends Component {


    componentWillUnmount() {
        this.stop()
    }


    constructor(props) {
        super(props)
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.clear = this.clear.bind(this)
        this.reactTableColumns = this.reactTableColumns.bind(this)
        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.state = {
            refreshPeriod: 4000,
            data: [],
            collapses: [],
        }
    }

    render() {

        return (
            <Card className="text-justify">
                <CardHeader>
                    <CardTitle className="mb-0 font-weight-bold h6">لایو فریم</CardTitle>
                </CardHeader>
                <CardHeader style={{display: 'flex', alignItems: 'center'}}>
                    <Button onClick={() => this.stop()} color="danger" style={{marginRight: '5px'}}>توقف</Button>
                    <Button onClick={() => this.start()} color="primary" style={{marginRight: '5px'}}>شروع</Button>
                    <Button onClick={() => this.clear()} style={{marginRight: '5px'}}>پاک کردن</Button>
                    <Loading size={'30px'} isOpen={this.state.interval}/>
                </CardHeader>
                <CardBody>
                    <ReactTable
                        data={this.state.data}
                        columns={this.reactTableColumns()}
                        pageSizeOptions={[10, 15, 25]}
                        nextText='بعدی'
                        previousText='قبلی'
                        filterable={true}
                        rowsText='ردیف'
                        pageText='صفحه'
                        ofText='از'
                        minRows='1'
                        noDataText='داده‌‌ای یافت نشد'
                        resizable={false}
                        className="-striped -highlight"
                    />
                </CardBody>
            </Card>

        )
    }

    reactTableColumns() {
        return [
            {
                Header: 'زمان',
                filterable: false,
                accessor: 'timestamp',
                maxWidth: 150,
            },
            {
                id: 'type',
                Header: 'نوع',
                accessor: row => row.uplinkframe ? 'Up Link' : 'Down Link',
                maxWidth: 100,
            },
            {
                id: 'devAddress',
                Header: 'آدرس',
                accessor: row => row.uplinkframe ? row.uplinkframe.phypayloadjson.macPayload.fhdr.devAddr :
                    row.downlinkframe.phypayloadjson.macPayload.fhdr.devAddr,
                maxWidth: 200,
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value),
            },
            {
                id: 'frequency',
                Header: 'فرکانس',
                accessor: row => (row.uplinkframe ? row.uplinkframe.txinfo.frequency : row.downlinkframe.txinfo.frequency) / Math.pow(10, 6),
                maxWidth: 100,
            },
            {
                id: 'bandwidth',
                Header: 'پهنای باند',
                accessor: row => row.uplinkframe ? row.uplinkframe.txinfo.datarate.bandwidth : row.downlinkframe.txinfo.datarate.bandwidth,
                maxWidth: 100,
            },
            {
                Header: 'فاکتور گسترش',
                id: 'spreadFactor',
                accessor: row => row.uplinkframe ? row.uplinkframe.txinfo.datarate.spreadfactor : row.downlinkframe.txinfo.datarate.spreadfactor,
                maxWidth: 100,
            },
            {
                id: 'payload',
                Header: 'Payload',
                filterable: false,
                accessor: row =>
                    <div style={{textAlign: 'left', direction: 'ltr'}}>
                        <div style={{textAlign: 'center'}}>
                            <Button onClick={() => this.toggleCollapse(row._id)} color="info">نمایش</Button>
                            <CopyToClipboard text={
                                row.uplinkframe ? row.uplinkframe.phypayloadjson.macPayload.frmPayload[0].bytes :
                                    row.downlinkframe.phypayloadjson.macPayload.frmPayload[0].bytes
                            }>
                                <i color="info" className={'icon-docs'}
                                   style={{marginLeft: '10px', cursor: 'pointer'}}/>
                            </CopyToClipboard>
                        </div>
                        <ReactJson
                            name={'Frame'}
                            style={{
                                display: this.state.collapses[row._id] ? 'block' : 'none',
                                backgroundColor: 'none',
                                fontSize: '12px'
                            }}
                            enableClipboard={false}
                            theme={'shapeshifter:inverted'}
                            displayObjectSize={false}
                            displayDataTypes={false}
                            src={row.uplinkframe ? row.uplinkframe.phypayloadjson : row.downlinkframe.phypayloadjson}/>
                    </div>


            }
        ];
    }

    start() {
        let interval = setInterval(() => {
            streamFetch(`/gateway/${this.props.gateway}/frames?since=${this.state.refreshPeriod / 1000}`,
                (response) => {
                    if (response && response.result && response.result.frames)
                        this.setState({data: [...response.result.frames, ...this.state.data]})
                })
        }, this.state.refreshPeriod)
        this.setState({interval})
    }

    stop() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.interval);
        this.setState({
            interval: 0
        })
    }

    clear() {
        this.setState({
            data: []
        })
    }

    toggleCollapse(id) {
        this.setState({
            collapses: {
                ...this.state.collapses,
                [id]: !this.state.collapses[id]
            }
        })
    }

}

