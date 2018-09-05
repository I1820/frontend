import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  CardFooter
} from 'reactstrap';
import ReactTable from 'react-table'
import JSONPretty from 'react-json-pretty';
import { connect } from 'react-redux';
import { getLogsAction } from '../../actions/AppActions';

class AdminLinks extends Component {

  constructor(props) {
    super(props);
    this.reactTableColumns = this.reactTableColumns.bind(this);
    this.fetchLogs = this.fetchLogs.bind(this);
    this.setLogs = this.setLogs.bind(this);
    this.state = {
      portainerUrl: '',
      prometheusUrl: '',
      logs: [],
      table: {
        pages: 1,
      },
    }
  }

  componentDidMount() {
    this.setState({
      prometheusUrl: this.props.config.prometheus_url,
      portainerUrl: this.props.config.portainer_url
    })
  }

  render() {

    return (
      <div>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">لینک پنل‌های مدیریتی</CardTitle>
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md='3'><strong>پنل Portainer</strong></Col>
                  <Col md='3'><a href={this.state.portainerUrl} target="_blank">لینک</a></Col>
                  <Col md='3'><strong>پنل Prometheus</strong></Col>
                  <Col md='3'><a href={this.state.prometheusUrl} target="_blank">لینک</a></Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>

        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">فعالیت‌های کاربران</CardTitle>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={this.state.logs}
              columns={this.reactTableColumns('logs')}
              nextText='بعدی'
              previousText='قبلی'
              filterable={true}
              rowsText='ردیف'
              pageText='صفحه'
              ofText='از'
              minRows='3'
              noDataText='فعالیتی وجود ندارد'
              loadingText='در حال دریافت اطلاعات...'
              resizable={false}
              loading={this.state.table.loading}
              onFetchData={this.fetchLogs}
              pages={this.state.table.pages}
              pageSizeOptions={[5, 10, 15, 25]}
              manual
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    )
  }

  fetchLogs(state, instance) {
    this.setState({table: {...this.state.table, loading: true}});
    this.props.dispatch(getLogsAction(
      state.pageSize,
      state.page * state.pageSize,
      {sorted: JSON.stringify(state.sorted), filtered: JSON.stringify(state.filtered)},
      this.setLogs
    ))
  }

  setLogs(res) {
    this.setState({
      logs: res.logs,
      table: {
        pages: res.pages,
        loading: false,
      }
    })
  }

  reactTableColumns(type) {
    switch (type) {
      case 'logs':
        return [
          {
            Header: 'تاریخ',
            accessor: 'created_at',
          },
          {
            Header: 'نام کاربر',
            accessor: 'user_name',
            maxWidth: 200
          }, {
            Header: 'ایمیل کاربر',
            accessor: 'user_email',
            maxWidth: 200
          },
          {
            Header: 'متد',
            accessor: 'method',
            maxWidth: 50
          }, {
            Header: 'آدرس',
            accessor: 'uri',
          },
          {
            Header: 'محتوای ریکوئست',
            id: 'body',
            accessor: row => <div style={{textAlign: 'left', direction: 'ltr'}}>
              <JSONPretty id="json-pretty" json={row.body}/>
            </div>
          }, {
            Header: 'آی پی‌ها',
            id: 'ips',
            accessor: row => <div style={{textAlign: 'left', direction: 'ltr'}}>
              <JSONPretty id="json-pretty" json={row.ips}/>
            </div>
          },
        ]
    }
  }


}

function mapStateToProps(state) {
  return {
    config: state.userReducer.config,
  };
}


export default connect(mapStateToProps)(AdminLinks);

