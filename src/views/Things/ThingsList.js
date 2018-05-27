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
  Table
} from 'reactstrap';
import {connect} from "react-redux";
import Spinner from '../Spinner/Spinner';
import {getThings} from "../../actions/AppActions";


class ThingsList extends Component {

  constructor(props) {
    super(props);
    this.renderThings = this.renderThings.bind(this)
  }


  componentDidMount() {
    this.props.dispatch(getThings())
  }


  render() {
    return (
      <div>
        <Spinner display={this.props.loading}/>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">لیست اشیاء</CardTitle>
          </CardHeader>
          <CardBody>
            <Table hover responsive className="table-outline">
              <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>نام شی</th>
                <th>توضیحات</th>
                <th>آدرس فیزیکی</th>
                <th>پروژه های متصل</th>
                <th>امکانات</th>
              </tr>
              </thead>
              <tbody>
              {
                this.renderThings()
              }
              </tbody>
            </Table>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    );
  }

  renderThings() {
    return this.props.things.map((thing, key) => {
      return (
        <tr>
          <th>{key + 1}</th>
          <td>{thing.name}</td>
          <td>{thing.description}</td>
          <td>{thing.interface.devEUI}</td>
          <td>{thing.project.name}</td>
          <td>
            <Button onClick={()=>{window.location = `#/projects/manage/${thing.project._id}`}} className="ml-1" color="warning" size="sm">مشاهده پروژه</Button>
          </td>
        </tr>
      )
    })
  }
}

function mapStateToProps(state) {
  return {
    things: state.thingReducer,
    loading: state.homeReducer.currentlySending
  };
}


export default connect(mapStateToProps)(ThingsList);
