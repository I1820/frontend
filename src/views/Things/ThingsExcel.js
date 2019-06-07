import React, {Component} from 'react'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Table
} from 'reactstrap'
import {uploadExcelAction} from '../../actions/AppActions'
import connect from 'react-redux/es/connect/connect'
import Spinner from '../Spinner/Spinner'
import {toastAlerts} from '../Shared/toast_alert'

class ThingsExcel extends Component {

    constructor(props) {
        super(props);
        this.callback = this.callback.bind(this)
    }

    componentWillMount() {
        const splitedUrl = window.location.href.split('/');
        this.setState({
            project: splitedUrl[6],
            result: []
        })
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">آپلود فایل Excel</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <p>برای ساخت دسته ای شی مانند فایل اکسل <a href='./files/sample.xls'>نمونه </a> را در سامانه
                                بارگذاری
                                نمایید</p>
                            <p>توجه کنید برای استفاده از فایل نمونه DevEui و پروفایل شی را باید تغییر دهید</p>
                            <br/>
                            <FormGroup row>
                                <Col sm={12}>
                                    <Input onChange={
                                        (e) => {
                                            this.setState({file: e.target.files[0]})
                                        }
                                    } type="file"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => {
                            this.props.dispatch(uploadExcelAction(this.state.file, this.state.project, this.callback))
                        }} color="primary">بارگذاری</Button>
                    </CardFooter>
                </Card>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نتیجه بارگزاری</CardTitle>
                    </CardHeader>
                    <CardBody>

                        <Table responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>آدرس فیزیکی</th>
                                <th>وضعیت افزوده شدن</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                Object.keys(this.state.result).map((res, key) => {
                                    return (this.renderLog(res, key))
                                })
                            }
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    }

    renderLog(res, key) {
        return (
            <tr id={key} key={key}>
                <td>{key + 1}</td>
                <td>{res}</td>
                <td>
                    <Badge
                        color={typeof (this.state.result[res]) === 'string'
                            ? 'danger' : 'success'}>{typeof (this.state.result[res]) === 'string' ?
                        this.state.result[res] : 'با موفقیت انجام شد'}</Badge>
                </td>
            </tr>
        )
    }

    callback(status, result) {
        if (status) {
            this.setState({
                result: {...status}
            });
            toastAlerts(true, result)
        } else {
            toastAlerts(false, result)
        }
    }
}

function mapStateToProps(state) {
    return {
        loading: state.homeReducer.currentlySending
    }
}

export default connect(mapStateToProps)(ThingsExcel);
