import React, {Component} from 'react'
import {Alert, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container,} from 'reactstrap'
import {getProfileAction, setTokenAction} from '../../actions/AppActions'
import {setAuthState} from '../../actions/HomeActions'
import {connect} from 'react-redux'

class AutoLogin extends Component {

    componentWillMount() {
        if (this.props.match.params.token) {
            const {dispatch} = this.props;
            dispatch(setTokenAction(this.props.match.params.token));
            dispatch(setAuthState(true))
        }
    }

    render() {
        return (
            <div className="app-body">
                <main className="main">
                    <Container fluid>
                        <div className="animated fadeIn">
                            <Card className="text-justify">
                                <CardHeader>
                                    <CardTitle className="mb-0 font-weight-bold h6">فعال سازی</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Alert color="success">
                                        <h4 className="alert-heading">
                                            <i className="fa fa-check-circle fa-lg mt-4"/><strong>{'با موفقیت انجام شد.'}</strong>
                                        </h4>
                                    </Alert>
                                </CardBody>
                                <CardFooter>
                                    <Button color={'success'} onClick={() => {
                                        this.props.dispatch(getProfileAction(() => this.props.history.push('/')))
                                    }}>
                                        {'هدایت به داشبورد'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </Container>
                </main>
            </div>
        )
    }

}

function mapStateToProps() {
    return {}
}

export default connect(mapStateToProps)(AutoLogin)
