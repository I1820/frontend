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
    }


    componentWillMount() {
        const splitedUrl = window.location.href.split('/');
        this.setState({
            project:splitedUrl[6]
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
                            this.props.dispatch(uploadExcelAction(this.state.file,this.state.project))
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
                                <th>نام</th>
                                <th>آدرس فیزیکی</th>
                                <th>وضعیت افزوده شدن</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderLog()}
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
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">4</PaginationLink>
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

    renderLog() {
        return (
            <tr>
                <td>1</td>
                <td>شی تستی</td>
                <td>آدرس شی</td>
                <td>
                    <Badge color="success">موفق</Badge>
                </td>
            </tr>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(ThingsExcel);
