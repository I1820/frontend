import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Badge,
    Modal,
    FormGroup,
    CardHeader,
    CardBody,
    CardFooter,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardTitle,
    Button,
    ButtonGroup,
    Label,
    Input,
    Table,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
    

} from 'reactstrap';

import {connect} from 'react-redux';
import {createProject, getProjects, deleteProjectAction} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import { style } from "react-toastify";
import Data from './portalData'

class PamentPortalList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            portalInfo : Data,
        };
    }

    componentWillMount() {
      
    }

  
    render() {
        let portalInfo = this.state.portalInfo;
        const portalInfoArray = Object.values(portalInfo);
        return (
            <div>
                <ToastContainer className="text-right" />
                <Spinner display={this.props.loading}/>
            


                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">درگاه‌های پرداخت</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>لوگو درگاه</th>
                                <th>نام درگاه</th>
                                <th>وب‌سایت</th>
                                <th>وضعیت</th>
                                <th> فعال‌سازی</th>
                               
                            </tr>
                            </thead>
                            <tbody>
                              {
                                portalInfoArray.map((el, key) => this.renderItem(el, key))   
                              }
                            </tbody>
                        </Table>

                      
                    </CardBody>
                   
                </Card>

            </div>
        );
    }

    renderItem(el, key = 0) {
        return (
            <tr>
                <th>{key + 1}</th>
                <td>
                  <img className="portal-style" src={el.logo}/>
                </td>
                <td>{el.portalName}</td>
                <td>{el.website}</td>
                <td>{el.status === true ? <Badge color="success"> فعال</Badge> :  <Badge color="danger"> غیر فعال</Badge> }</td>

                <td> 
                <Button outline color="success"><i className="fa fa-edit"></i>فعال‌سازی</Button>
                </td>
                
            </tr>
        )
    }


}

function mapStateToProps(state) {
    return {
        loading: state.homeReducer.currentlySending
    };
}


export default connect(mapStateToProps)(PamentPortalList);
