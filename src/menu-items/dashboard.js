// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';

// icons
const icons = {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined
};
// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const DashboardMenu = {
  id: 'group-applications',
  title: <FormattedMessage id="lbl.dashboard" />,
  icon: icons.AppstoreAddOutlined,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="lbl.dashboard" />,
      type: 'item',
      url: '/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },

    {
      id: 'profile',
      title: <FormattedMessage id="lbl.profile" />,
      type: 'item',
      url: '/profile',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default DashboardMenu;
