import React, {Component} from 'react'

import {Card, CardBody,} from 'reactstrap'
import ReactTable from 'react-table'
import ReactHighcharts from 'react-highcharts';
import moment from 'moment-jalaali'

class Widget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.chart
        };
    }

    render() {
        if (this.state.data === undefined) {
            return (
                <CardBody>
                </CardBody>
            )
        } // return where there is no data for the widget
        if (this.state.type === 'line') {
            let config = {
                plotOptions: {
                    line: {
                        animation: false
                    }
                },
                chart: {
                    style: {
                        fontFamily: 'Tahoma'
                    }
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'مقدار'
                    }
                },
                series: [{
                    data: []
                }],
                credits: {
                    enabled: true
                },
            };

            config.series[0].data = [];
            config.series[0].name = this.state.alias;
            config.series[0].label = this.state.alias;
            this.state.data.reverse().forEach((d) => {
                config.xAxis.categories.push(moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss'));
                config.series[0].data.push(d.value);
                config.series[0].name = this.state.alias
            });
            this.state.data.reverse(); // switch back to default order!

            return (
                <CardBody>
                    <ReactHighcharts config={config}/>
                </CardBody>
            )
        } else if (this.state.type === 'table') {
            return (
                <Card className="text-justify">
                    <CardBody>
                        <ReactTable
                            data={this.state.data.reverse()}
                            columns={this.reactTableColumns(this.state.thing)}
                            pageSizeOptions={[5]}
                            nextText='بعدی'
                            previousText='قبلی'
                            filterable={true}
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='1'
                            noDataText='داده‌ای وجود ندارد'
                            resizable={false}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </CardBody>
                </Card>
            );
        }
    }

    reactTableColumns(thing) {
        return [
            {
                Header: 'شی فرستنده',
                id: 'thing',
                accessor: thing.name
            },
            {
                id: 'timestamp',
                Header: 'زمان دریافت داده',
                accessor: row => moment(row.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')
            },
            {
                id: 'value',
                Header: 'داده دریافت شده',
                accessor: row => JSON.stringify(row.value)
            },
        ]
    }
}

export default Widget;
