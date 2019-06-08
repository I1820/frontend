import React from 'react'
import {Link, Route} from 'react-router-dom'
import {Breadcrumb, BreadcrumbItem} from 'reactstrap'
import routes from '../../routes'

const findRouteName = url => routes[url];

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
    const yep = match.url.split('/');
    let routeName = findRouteName(match.url);
    if (yep.length > 4 && yep[3] === 'createThing') {
        routeName = 'manage'
    }

    if (routeName) {

        let matchurl;

        if (routeName === 'manage') {
            matchurl = '/projects/manage/show/' + yep[4];
            routeName = 'مدیریت پروژه'
        } else if (match.url === '/project') {
            matchurl = '/projects'
        } else if (match.url === '/admin/packages') {
            matchurl = '/admin/packages/show'
        } else if (match.url === '/admin/users') {
            matchurl = '/admin/users/list'
        } else {
            matchurl = match.url
        }
        return (
            (match.isExact && yep.length < 5) || (findRouteName(match.url + '/$$')) ?
                (
                    <BreadcrumbItem active>{routeName}</BreadcrumbItem>
                ) :
                (
                    <BreadcrumbItem>
                        <Link to={matchurl || ''}>
                            {routeName}
                        </Link>
                    </BreadcrumbItem>
                )
        )

    }
    return null

};

const Breadcrumbs = ({location: {pathname}, match, ...rest}) => {
    const paths = getPaths(pathname);

    for (let j = 0; j < paths.length; j++) {
        if (paths[j] === '/admin/packages/show') {
            for (let k = 0; k < paths.length; k++) {
                if (paths[k] === '/admin/packages') {
                    paths[k] = '/nothing'
                }
            }
        }

        if (paths[j] === '/admin/users/list') {
            for (let k = 0; k < paths.length; k++) {
                if (paths[k] === '/admin/users') {
                    paths[k] = '/nothing'
                }
            }
        }
    }
    if (paths[3] === '/project/manage/createThing') {
        let temp = paths[3];
        paths[3] = paths[4];
        paths[4] = temp
    }

    const items = paths.map((path, i) => <Route key={i++} path={path} component={BreadcrumbsItem}/>);
    return (
        <div>
            <Breadcrumb dir={"rtl"}>
                {items}
            </Breadcrumb>
        </div>

    )
};

export default props => (
    <div>
        <Route path="/:path" component={Breadcrumbs} {...props} />
    </div>
);
