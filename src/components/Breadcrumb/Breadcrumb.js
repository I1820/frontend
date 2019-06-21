import React from 'react'
import {matchPath} from 'react-router'
import {Link, Redirect, Route} from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
} from 'reactstrap'
import routes from '../../routes'

const findRouteName = (url) =>
    routes[Object.keys(routes).filter((path) => matchPath(url, {exact: true, path}))[0]];

const getPaths = (pathname) => {
    const paths = ['/'];

    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev, curr, index) => {
        let currPath = `${prev}/${curr}`;
        paths.push(currPath);

        return currPath
    });
    return paths
};

const BreadcrumbsItem = ({match, ...rest}) => {
    let routeName = findRouteName(match.url);

    if (!routeName) {
        return <Redirect to='/' />
    }

    if (routeName.name.startsWith(':')) {
        routeName.name = match.url.split('/').pop();
    }

    if (routeName.enable === false && match.isExact === true) {
        return <Redirect to='..' />
    }

    return (
        (match.isExact) ?
            (
                <BreadcrumbItem active>{routeName.name}</BreadcrumbItem>
            ) : (routeName.enable) ?
            (
                <BreadcrumbItem>
                    <Link to={match.url}>
                        {routeName.name}
                    </Link>
                </BreadcrumbItem>
            ) : (
                <BreadcrumbItem active>
                    {routeName.name}
                </BreadcrumbItem>
            )
    )
};

const Breadcrumbs = ({location: {pathname}, match, ...rest}) => {
    const paths = getPaths(pathname);

    const items = paths.map((path, i) => <Route key={i} path={path} component={BreadcrumbsItem}/>);
    return (
        <Breadcrumb>
            {items}
            <div className="breadcrumb-menu">
                      <ButtonGroup>
                          <Button color="">بیشتر بدانید</Button>
                      </ButtonGroup>
            </div>
        </Breadcrumb>
    )
};

export default props => (
    <div>
        <Route path="/:path" component={Breadcrumbs} {...props} />
    </div>
);
