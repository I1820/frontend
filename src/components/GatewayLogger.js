import React, { Component } from 'react'
import { streamFetch } from '../api'

import { Button, Card, CardBody, CardHeader, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import ReactTable from 'react-table'
import ReactJson from 'react-json-view'
import Loading from './Loading'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toastAlerts } from '../views/Shared/toast_alert'

export default class GatewayLogger extends Component {

  constructor (props) {
    super(props)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.clear = this.clear.bind(this)
    this.reactTableColumns = this.reactTableColumns.bind(this)
    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      refreshPeriod: 4000,
      data: [],
      collapses: [],
      jsonModal: false,
      jsonData: ''
    }
  }

  componentWillUnmount () {
    this.stop()
  }

  render () {

    return (
      <div>
        <Modal isOpen={this.state.jsonModal} toggle={() => this.toggle('json')}
               className="text-right">
          <ModalHeader>محتوای فیزیکی:</ModalHeader>
          <ModalBody>
            <ReactJson
              name={'Frame'}
              style={{ backgroundColor: 'none', fontSize: '12px', textAlign: 'left', direction: 'ltr' }}
              enableClipboard={false}
              // theme={'shapeshifter:inverted'}
              displayObjectSize={false}
              displayDataTypes={false}
              src={this.state.jsonData}/>
          </ModalBody>
          <ModalFooter>

            <Button color="danger" onClick={() => this.toggle('json')}>بستن</Button>
          </ModalFooter>
        </Modal>

        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">لایو فریم</CardTitle>
          </CardHeader>
          <CardHeader style={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={() => this.stop()} color="danger" style={{ marginRight: '5px' }}>توقف</Button>
            <Button onClick={() => this.start()} color="primary" style={{ marginRight: '5px' }}>شروع</Button>
            <Button onClick={() => this.clear()} style={{ marginRight: '5px' }}>پاک کردن</Button>
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
      </div>

    )
  }

  reactTableColumns () {
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
      }, {
        Header: 'شمارنده بسته',
        id: 'fcnt',
        accessor: row => row.uplinkframe ? row.uplinkframe.phypayloadjson.macPayload.fhdr.fCnt :
          row.downlinkframe.phypayloadjson.macPayload.fhdr.fCnt,
        maxWidth: 100,
      },
      {
        Header: 'RSSI',
        id: 'rssi',
        accessor: row => <div style={{
          direction: 'ltr',
          textAlign: 'right'
        }}>{row.uplinkframe ? (row.uplinkframe.rxinfo.length ? row.uplinkframe.rxinfo[0].rssi : '') :
          row.downlinkframe.rxinfo.length ? row.downlinkframe.rxinfo[0].rssi : ''}</div>,
        maxWidth: 100,
      },
      {
        id: 'payload',
        Header: 'Payload',
        filterable: false,
        accessor: row =>
          <div style={{ textAlign: 'left', direction: 'ltr' }}>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => this.toggle('json', row.uplinkframe ? row.uplinkframe : row.downlinkframe)}
                      color="info">نمایش</Button>
              <CopyToClipboard text={
                row.uplinkframe ? row.uplinkframe.phypayloadjson.macPayload.frmPayload[0].bytes :
                  row.downlinkframe.phypayloadjson.macPayload.frmPayload[0].bytes
              }>
                <i color="info" className={'icon-docs'} onClick={() => {
                  toastAlerts(true, 'کپی شد')
                }}
                   style={{ marginLeft: '10px', cursor: 'pointer' }}/>
              </CopyToClipboard>
            </div>
          </div>

      }
    ]
  }

  start () {
    let interval = setInterval(() => {
      streamFetch(`/gateway/${this.props.gateway}/frames?since=${this.state.refreshPeriod / 1000}`,
        (response) => {
          if (response && response.result && response.result.frames) {
            this.setState({ data: [...response.result.frames, ...this.state.data] })
          }
        })
    }, this.state.refreshPeriod)
    this.setState({ interval })
  }

  stop () {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.interval)
    this.setState({
      interval: 0
    })
  }

  clear () {
    this.setState({
      data: []
    })
  }

  toggleCollapse (id) {
    this.setState({
      collapses: {
        ...this.state.collapses,
        [id]: !this.state.collapses[id]
      }
    })
  }

  toggle (modal, data) {
    let state = {}
    if (modal === 'json') {
      state = {
        jsonModal: !this.state.jsonModal,
        jsonData: data ? data : ''
      }
    }
    this.setState(state);
  }

}

