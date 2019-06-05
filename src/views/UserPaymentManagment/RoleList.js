import React, { Component } from 'react'
// import {selectUser} from '../../actions/AppActions'
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Input } from 'reactstrap'
import {
  addRoleAction,
  deleteRoleAction,
  getPermissionsAction,
  getRolesAction,
  updateRoleAction
} from '../../actions/AppActions'
import { connect } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import ReactTable from 'react-table'
import { toastAlerts } from '../Shared/toast_alert'
import Select2 from 'react-select2-wrapper'

class RoleList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      roles: [],
      defaultPermissions: []
    }
  }

  componentWillMount () {
    this.props.dispatch(getRolesAction((status, roles) => {
      if (status) {
        this.setState({ roles })
      } else {
        toastAlerts(status, roles)
      }
    }))
    this.props.dispatch(getPermissionsAction((defaultPermissions) => {
      this.setState({ defaultPermissions })
    }))

  }

  render () {
    return (

      <div>
        <Spinner display={this.props.loading}/>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">لیست نقش ها</CardTitle>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={this.state.roles}
              columns={this.reactTableColumns()}
              pageSizeOptions={[5, 10, 25]}
              nextText='بعدی'
              previousText='قبلی'
              filterable={true}
              rowsText='ردیف'
              pageText='صفحه'
              ofText='از'
              minRows='1'
              noDataText='داده ای وجود ندارد'
              resizable={false}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </CardBody>
          <CardFooter>
            <Button onClick={() => {
              if (this.state.defaultPermissions.length > 0) {

                let permissions = []
                this.state.defaultPermissions.forEach((permission) => {
                  permissions.push(permission._id)
                })

                this.props.dispatch(addRoleAction(permissions, (status, message) => {
                  toastAlerts(status, message)
                  this.props.dispatch(getRolesAction((status, roles) => {
                    if (status) {
                      this.setState({ roles })
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

  reactTableColumns () {
    return [
      {
        Header: 'نام نقش',
        id: 'name',
        accessor: row => {
          return (<Input
            onChange={(event) => {
              row.name = event.target.value
            }}
            type="text"
            defaultValue={row.name}
          />)
        }
      },
      {
        Header: 'دسترسی ها',
        id: 'permissions',
        accessor: row => {
          // return(<div>{row.permissions.map((permission)=>{
          //   return(permission.name + ", ")
          // })}</div>)
          let permissionsList = []
          row.permissions.forEach((permission) => {
            permissionsList.push(permission._id)
          })

          return (<Select2
            style={{ width: '100%' }}
            multiple
            data={this.state.defaultPermissions.map((permission) => {
              return { text: permission.name, id: permission._id }
            })}
            value={permissionsList}
            onSelect={(unselectedPermission) => {
              row.permissions = []
              for (let i = 0; i < unselectedPermission.target.selectedOptions.length; i++) {
                row.permissions.push(unselectedPermission.target.selectedOptions[i].value)
              }
              console.log('new permission', row.permissions)
            }}
            onUnselect={(unselectedPermission) => {
              row.permissions = []
              for (let i = 0; i < unselectedPermission.target.selectedOptions.length; i++) {
                row.permissions.push(unselectedPermission.target.selectedOptions[i].value)
              }
              console.log('new permission', row.permissions)
            }}
            options={
              {
                placeholder: 'شی مورد نظر را انتخاب کنید',
              }
            }
          />)
        }
      },
      {
        id: 'rowTools',
        Header: 'امکانات',
        maxWidth: 80,
        filterable: false,
        accessor: row => <div>
          <Button onClick={() => {
            let permissions = []
            row.permissions.forEach((permission) => {
              if (permission._id) {
                permissions.push(permission._id)
              } else {
                permissions.push(permission)
              }
            })

            console.log(row.permissions, permissions)
            this.props.dispatch(updateRoleAction(row._id, JSON.stringify(permissions), row.name, (status, message) => {
              toastAlerts(status, message)
              this.props.dispatch(getRolesAction((status, roles) => {
                if (status) {
                  this.setState({ roles })
                } else {
                  toastAlerts(status, roles)
                }
              }))
            }))
          }}
                  className="ml-1" color="warning"
                  size="sm">بروزرسانی</Button>
          <br/>
          <Button onClick={() =>
            this.props.dispatch(deleteRoleAction(row._id, (status, message) => {
              toastAlerts(status, message)
              this.props.dispatch(getRolesAction((status, roles) => {
                if (status) {
                  this.setState({ roles })
                } else {
                  toastAlerts(status, roles)
                }
              }));
            }))
          } className="ml-1" color="danger"
                  size="sm">حذف</Button>
        </div>
      }
    ];
  }
}

function mapStateToProps (state) {
  return {
    loading: state.homeReducer.currentlySending,
  };
}

export default connect(mapStateToProps)(RoleList);

