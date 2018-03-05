import React, { Component } from 'react';
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
  Table
} from 'reactstrap';

import Spinner from '../Spinner/Spinner.js';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import { style } from "react-toastify";

style({
    colorProgressDefault: 'white'
});

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.showAlert = this.showAlert.bind(this);
    }

    showAlert() {
        toast('اطلاعات با موفقیت ارسال شد', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#dbf2e3',
                    color: '#28623c'
                }),
                progressClassName: css({
                    background: '#28623c'
                })
        });
        toast('اطلاعات با موفقیت ارسال نشد', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#fee2e1',
                    color: '#813838',
                }),
                progressClassName: css({
                    background: '#813838'
                })
        });
    }

    render() {

        return (

            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">تست Alert</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Button color="primary" onClick={this.showAlert}>نمایش</Button>
                        <ToastContainer />
                    </CardBody>
                </Card>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">داشبورد</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Spinner display={true} />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </CardBody>
                </Card>
            </div>

        );

    }

}

export default Dashboard;
