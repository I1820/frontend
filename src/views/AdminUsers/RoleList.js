import React, {Component} from 'react'
import {Button, ButtonGroup, FormGroup, Label, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Input,} from 'reactstrap'
import {
    addRoleAction,
    deleteRoleAction,
    getPermissionsAction,
    getRolesAction,
    updateRoleAction
} from '../../actions/AppActions'
import {connect} from 'react-redux'
import {toastAlerts} from '../Shared/toast_alert'
import Select from 'react-select'

class RoleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            defaultPermissions: [],
        }
    }

    componentWillMount() {
        this.props.dispatch(getRolesAction((status, roles) => {
            if (status) {
                this.setState({roles})
            } else {
                toastAlerts(status, roles)
            }
        }));
        this.props.dispatch(getPermissionsAction((defaultPermissions) => {
            this.setState({defaultPermissions})
        }))

    }

    render() {
        return (
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست نقش‌ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {
                            this.state.roles.map((role, i) => {
                                let row = {
                                    _id: role._id,
                                    name: role.name,
                                    permissions: role.permissions.map(permission => ({label: permission.name, value: permission._id}))
                                }
                                return (
                                    <Card key={i}>
                                        <CardHeader dir='ltr'>
                                            <CardTitle className="mb-0 font-weight-bold h6">{row._id}</CardTitle>
                                        </CardHeader>

                                        <CardBody>
                                            <FormGroup row>
                                                <Label sm={2}>نام</Label>
                                                <Col sm={10}>
                                                    <Input
                                                        onChange={(event) => {
                                                            row.name = event.target.value
                                                        }}
                                                        type="text"
                                                        defaultValue={row.name}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm={2}>دسترسی‌ها</Label>
                                                <Col sm={10}>
                                                    <Select
                                                        isMulti={true}
                                                        isRtl={true}
                                                        options={this.state.defaultPermissions.map((permission) => ({label: permission.name, value: permission._id}))}
                                                        defaultValue={row.permissions}
                                                        onChange={(permissions) => {
                                                            row.permissions = permissions ? permissions : []
                                                        }}
                                                        placeholder='دسترسی‌های مورد نظر خود را انتخاب کنید'
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </CardBody>
                                        <CardFooter>
                                            <ButtonGroup>
                                                <Button onClick={() => {
                                                    let permissions = row.permissions.map((permission) => {
                                                        return permission.value
                                                    });
                                                    this.props.dispatch(updateRoleAction(row._id, JSON.stringify(permissions), row.name, (status, message) => {
                                                        toastAlerts(status, message);
                                                        this.props.dispatch(getRolesAction((status, roles) => {
                                                            if (status) {
                                                                this.setState({roles})
                                                            } else {
                                                                toastAlerts(status, roles)
                                                            }
                                                        }))
                                                    }))
                                                }}
                                                className="ml-1" color="warning"
                                                size="sm">بروزرسانی
                                            </Button>
                                            <Button onClick={() =>
                                                    this.props.dispatch(deleteRoleAction(row._id, (status, message) => {
                                                        toastAlerts(status, message);
                                                        this.props.dispatch(getRolesAction((status, roles) => {
                                                            if (status) {
                                                                this.setState({roles})
                                                            } else {
                                                                toastAlerts(status, roles)
                                                            }
                                                        }));
                                                    }))
                                            } className="ml-1" color="danger"
                                            size="sm">حذف
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                                )
                            })
                        }
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => {
                            if (this.state.defaultPermissions.length > 0) {

                                let permissions = [];
                                this.state.defaultPermissions.forEach((permission) => {
                                    permissions.push(permission._id)
                                });

                                this.props.dispatch(addRoleAction(permissions, (status, message) => {
                                    toastAlerts(status, message);
                                    this.props.dispatch(getRolesAction((status, roles) => {
                                        if (status) {
                                            this.setState({roles})
                                        } else {
                                            toastAlerts(status, roles)
                                        }
                                    }))
                                }))
                            }
                        }
                        } className="ml-1" color="danger"
                        size="sm">افزودن</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.homeReducer.currentlySending,
    };
}

export default connect(mapStateToProps)(RoleList);

