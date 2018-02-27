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

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">داشبورد</CardTitle>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                </Card>
            </div>

        );

    }

}

export default Dashboard;
