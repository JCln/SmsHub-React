import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem, MenuItemOptions } from 'primereact/menuitem';
import * as ENRoutes from '../constants/ENRoutes';
import { NavLink } from 'react-router';

export default function CustomBreadcrumb() {
    const iconItemTemplate = (item: MenuItem, options: MenuItemOptions) => {
        return (
            <NavLink to={ENRoutes.SMSHub} className="nav__dropdown-item"></NavLink>
        );
    };
    const items: MenuItem[] = [
        { icon: 'smsHub', template: () => <NavLink to={ENRoutes.SMSHub}>test</NavLink> },
        { icon: '12', template: () => <NavLink to={ENRoutes.CCSend}>test2</NavLink> },
        { icon: '353', template: () => <NavLink to={ENRoutes.Permittedtime}>test3</NavLink> },
    ];
    const home: MenuItem = { icon: 'pi pi-home', url: ENRoutes.SMSHub }

    return (
        <BreadCrumb model={items} home={home} />
    )
}
