import React, {Component} from 'react'
import {getProfileAction, getUserPackagesAction} from '../../actions/AppActions'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    ListGroup,
    ListGroupItem,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    Table,
    TabPane,
} from 'reactstrap'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {IPackage} from "../../api/package";

interface IState {
    activeTab: string;
    packages: IPackage[];
    boughtPackage: IPackage;
}

class Packages extends Component<any, IState> {
    constructor(props: any) {
        super(props);
        Packages.renderPackage = Packages.renderPackage.bind(this);

        this.toggleTab = this.toggleTab.bind(this);

        this.state = {
            packages: [],
            boughtPackage: {
                name: 'بدون بسته فعال',
                _id: '',
                project_num: 0,
                node_num: 0,
                price: 0,
                time: 0,
                start_date: new Date().toLocaleDateString()
            },
            activeTab: 'my_package',
        }
    }

    get remainingDays(): number {
        const millisecondsDay = 1000 * 60 * 60 * 24;

        const startDate = new Date(this.state.boughtPackage.start_date);
        const diffTime = Math.max(
            -new Date().getTime() + (startDate.getTime() + this.state.boughtPackage.time * millisecondsDay)
            , 0);
        return Math.ceil(diffTime / millisecondsDay);
    }

    static renderPackage(pkg: IPackage) {
        return (
            <Col xs="12" sm="6" md="4" key={pkg._id}>
                <Card>
                    <CardHeader>
                        {pkg.name}
                    </CardHeader>
                    <CardBody>
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col md='6'><strong> مبلغ قابل پرداخت</strong></Col>
                                    <Col md='6'><span>{pkg.price} </span><span> ریال</span></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col md='6'><strong>تعداد سنسور</strong></Col>
                                    <Col md='6'><span>{pkg.node_num}</span></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col md='6'><strong>تعداد پروژه</strong></Col>
                                    <Col md='6'><span>{pkg.project_num}</span></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col md='6'><strong>مهلت بسته</strong></Col>
                                    <Col md='6'><span>{pkg.time}</span></Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>
                    </CardBody>
                    <CardFooter>
                        <Link to={`/packages/${pkg._id}`}>
                            <Button color="primary">
                                <i className="icon-basket-loaded icons"/> خرید
                            </Button>
                        </Link>
                    </CardFooter>

                </Card>
            </Col>
        )
    }

    componentWillReceiveProps(props: any) {
        if (props.packages) {
            this.setState({
                packages: props.packages
            })
        }
        if (props.boughtPackage) {
            this.setState({
                boughtPackage: props.boughtPackage
            });
        }
    }

    componentWillMount() {
        this.props.dispatch(getUserPackagesAction());
        this.props.dispatch(getProfileAction())
    }

    toggleTab(tab: string) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === 'my_package'})}
                            onClick={() => {
                                this.toggleTab('my_package')
                            }}>بسته فعلی من</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === 'buy_package'})}
                            onClick={() => {
                                this.toggleTab('buy_package')
                            }}>خرید بسته</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={'my_package'}>
                        <Card className="text-justify">
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6">بسته‌ی فعال من
                                    <Badge className="pull-left"
                                           color={this.remainingDays > 0 ? 'success' : 'danger'}>
                                        {this.remainingDays > 0 ? 'اعتبار دارد' : 'پایان اعتبار'}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table borderless>
                                    <tbody>
                                    <tr>
                                        <td>نام بسته:</td>
                                        <td>{this.state.boughtPackage.name}</td>
                                    </tr>
                                    <tr>
                                        <td>مدت زمان بسته:</td>
                                        <td>{this.state.boughtPackage.time + ' روز'}</td>
                                    </tr>
                                    <tr>
                                        <td>روزهای باقیمانده:</td>
                                        <td>
                                            {this.remainingDays}
                                            {' روز'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>تعداد پروژه‌ها:</td>
                                        <td>{this.state.boughtPackage.project_num}</td>
                                    </tr>
                                    <tr>
                                        <td>تعداد شی‌ها:</td>
                                        <td>{this.state.boughtPackage.node_num}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </TabPane>
                    <TabPane tabId={'buy_package'}>
                        <Row>
                            {this.state.packages.map((item) => Packages.renderPackage(item))}
                        </Row>
                    </TabPane>
                </TabContent>

            </div>
        )
    }

}

function mapStateToProps(state: any) {
    return {
        packages: state.packageReducer.userPackages,
        boughtPackage: state.userReducer.package
    }
}

export default connect(mapStateToProps)(Packages)

