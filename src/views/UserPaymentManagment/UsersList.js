import React, {Component} from "react";
// import {selectUser} from '../../actions/AppActions'
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
    FormText
} from 'reactstrap';
import {SelectUser} from "../../actions/AppActions";
import Data from './userData'
import {connect} from 'react-redux';
import Spinner from "../Spinner/Spinner";

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this)
        this.searchHandler = this.searchHandler.bind(this)
        this.selectHandler = this.selectHandler.bind(this)
        this.state = { 
            usersInfo : Data,
            modal: false,
            deleteModal: false,
            items: [],
        }
    }

    componentWillMount() {
        let usersInfo = this.state.usersInfo;
        let usersArray = Object.values(usersInfo);
        this.setState({items: usersArray})
    }
    
    searchHandler(event) {
        var updatedList = this.state.usersInfo;
        let usersArrayUpdated = Object.values(updatedList);
        usersArrayUpdated = usersArrayUpdated.filter(function(item){
          return item.name.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: usersArrayUpdated});
      
        console.log(this.state.items)
      }
      selectHandler(event){
            console.log(event.target.value)
        var updatedList = this.state.usersInfo;
        let usersArrayUpdated = Object.values(updatedList);
        usersArrayUpdated = usersArrayUpdated.filter(function(item){
            return item.utype.toLowerCase().search(
              event.target.value.toLowerCase()) !== -1;
          });
        this.setState({items: usersArrayUpdated});
      }

    render() {

        let usersInfo = this.state.items;
        const usersArray = Object.values(usersInfo);

        return (
           
            <div className="animated fadeIn">
             <Spinner display={this.props.loading}/>
             <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">جستجو کاربران</CardTitle>
                    </CardHeader>
                    <CardBody>
                     <Row>
                        <Col xs="12" md="6">
                            <Input type="text" placeholder="جستجو نام" onChange={this.searchHandler}/>
                            <FormText className="help-block"> لطفا نام کاربر مورد نظر را وارد کنید</FormText>
                        </Col>
                        <Col xs="12" md="6">
                            <Input type="select"  onChange={this.selectHandler}>
                                <option>نوع کاربر</option>
                                <option>حقیقی</option>
                                <option>حقوقی</option>
                            </Input>
                            <FormText className="help-block"> لطفا نوع کاربر مورد نظر را انتخاب کنید</FormText>
                        </Col>
                    
                    
                    </Row>
                    </CardBody>
                   
                </Card>
            </div>
    


           <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست کاربران</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>نام کاربر</th>
                                <th>ایمیل</th>
                                <th>تلفن همراه</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                 usersArray.map((el, key) => this.renderItem(el, key))
                               
                            }
                            </tbody>
                        </Table>
                    </CardBody>
                   
                </Card>
            </div>
    
            </div>
        )
    }
    renderItem(el, key = 0) {
        return (
            
            <tr  className="cursorShape"  onClick={() => this.props.dispatch(SelectUser(el.name))}>
                <th>{key + 1}</th>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.mobile}</td>
                            
            </tr>
        )
    }
  
}
function mapStateToProps(state) {
    return {
        loading: state.homeReducer.currentlySending
    };
}


export default connect(mapStateToProps)(UsersList);

