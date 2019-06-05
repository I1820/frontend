import React, { Component } from 'react'
import {
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
  Label,
} from 'reactstrap'
import connect from 'react-redux/es/connect/connect'
import Spinner from '../Spinner/Spinner'
import { createPackagesAction, getPackageAction, updatePackagesAction } from '../../actions/AppActions'
import { toastAlerts } from '../Shared/toast_alert'

class PackageManage extends Component {

  constructor (props) {
    super(props)

    this.changeForm = this.changeForm.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      name: '',
      time: 0,
      price: 0,
      node_num: 0,
      project_num: 0,
    }
  }

  componentWillReceiveProps (props) {
    this.setState({ ...this.state, ...props.package }, () => console.log(this.state))
  }

  componentWillMount () {
    if (this.props.match.params.id) {
      this.props.dispatch(getPackageAction(this.props.match.params.id))
    }
  }

  render () {
    return (
      <div>
        <Spinner display={this.props.loading}/>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">اطلاعات بسته</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label sm={2}>نام بسته:</Label>
                <Col sm={4}>
                  <Input name="name"
                         onChange={this.changeForm}
                         type="text"
                         value={this.state.name}
                         placeholder={'بسته طلایی'}
                         maxLength={150}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}> تعداد سنسور:</Label>
                <Col sm={4}>
                  <Input name="node_num"
                         onChange={this.changeForm}
                         value={this.state.node_num}
                         type="number"
                         placeholder={'برای مثال: ۱۰'}
                         min={1}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}> تعداد پروژه:</Label>
                <Col sm={4}>
                  <Input name="project_num"
                         onChange={this.changeForm}
                         value={this.state.project_num}
                         type="number"
                         placeholder={'برای مثال: ۱۰'}
                         min={1}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>مهلت بسته:</Label>
                <Col sm={4}>
                  <Input name="time"
                         onChange={this.changeForm}
                         value={this.state.time}
                         type="number"
                         placeholder={'برای مثال: ۱۰ روز'}
                         min="1"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>مبلغ بسته (تومان):</Label>
                <Col sm={4}>
                  <Input
                    name="price"
                    onChange={this.changeForm}
                    value={this.state.price}
                    type="number"
                    min="0"
                    placeholder={'برای مثال: ۱۰۰۰ تومان'}
                  />
                </Col>
              </FormGroup>

            </Form>
          </CardBody>
          <CardFooter>
            <Button onClick={this.submitForm} color="primary">
              {this.props.match.params.id ? 'ویرایش بسته' : 'ایجاد بسته'}
            </Button>
          </CardFooter>
        </Card>


      </div>
    )
  }

  submitForm () {
    const data = {
      name: this.state.name,
      node_num: this.state.node_num,
      project_num: this.state.project_num,
      time: this.state.time,
      price: this.state.price,
    }
    if (this.props.match.params.id) {
      this.props.dispatch(updatePackagesAction(this.props.match.params.id, data, toastAlerts))
    } else {
      this.props.dispatch(createPackagesAction(data, toastAlerts))
    }

  }

  changeForm (event) {
    let state = {}
    state[event.target.name] = event.target.value
    this.setState({
      ...this.state,
      ...state
    })
  }

}

function mapStateToProps (state) {
  return {
    loading: state.homeReducer.currentlySending,
    package: state.packageReducer.package,
  }
}

export default connect(mapStateToProps)(PackageManage);
