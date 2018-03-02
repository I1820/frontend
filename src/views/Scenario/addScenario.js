import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button,
} from 'reactstrap';


class AddScenario extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایشگر سناریو</CardTitle>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                    <CardFooter>
                        <Button className="ml-1" color="primary" size="md">ارسال سناریو</Button>
                        <Button className="ml-1" color="warning" size="md">چک کردن سناریو</Button>
                    </CardFooter>
                </Card>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نتیجه بررسی سناریو</CardTitle>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                </Card>
            </div>
        );
    }

}

export default AddScenario;
