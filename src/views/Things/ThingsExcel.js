import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Badge,
    FormGroup,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button,
    ButtonGroup,
    Label,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import {getThingProfileListAction, uploadExcelAction} from "../../actions/AppActions";
import connect from "react-redux/es/connect/connect";


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
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">آپلود فایل Excel</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <p>برای ساخت دسته ای شی مانند فایل اکسل نمونه را در سامانه بارگذاری نمایید</p>
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
                        <Pagination>
                            <PaginationItem>
                                <PaginationLink previous href="#"/>
                            </PaginationItem>
                            <PaginationItem active>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next href="#"/>
                            </PaginationItem>
                        </Pagination>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderLog(res, key) {
        return (
            <tr id={key}>
                <td>{key + 1}</td>
                <td>{res}</td>
                <td>
                    <Badge
                        color={this.state.result[res].indexOf('Error') !== -1
                            ? 'danger' : 'success'}>{this.state.result[res]}</Badge>
                </td>
            </tr>
        )
    }

    callback(result) {
        console.log(result)
        if (result)
            this.setState({
                result
            })
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(ThingsExcel);
