import React from 'react'
import {matchPath} from 'react-router'
import {Link, Redirect, Route} from 'react-router-dom'
import {Breadcrumb, BreadcrumbItem} from 'reactstrap'
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

    if (routeName.startsWith(':')) {
        routeName = match.url.split('/').pop();
    }

    return (
        (match.isExact) ?
            (
                <BreadcrumbItem active>{routeName}</BreadcrumbItem>
            ) :
            (
                <BreadcrumbItem>
                    <Link to={match.url}>
                        {routeName}
                    </Link>
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
        </Breadcrumb>
    )
};

export default props => (
    <div>
        <Route path="/:path" component={Breadcrumbs} {...props} />
    </div>
);
