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


class ThingsExcel extends Component {

    constructor(props) {
        super(props);
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
                                    <Input type="file"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">بارگزاری</Button>
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
                                <PaginationLink previous href="#"></PaginationLink>
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
                                <PaginationLink next href="#"></PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderLog() {
        return(
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

export default ThingsExcel;
