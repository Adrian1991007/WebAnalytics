// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BorderOutlined,
  BoxPlotOutlined,
  ChromeOutlined,
  DeploymentUnitOutlined,
  GatewayOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  SmileOutlined,
  StopOutlined
} from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  MenuUnfoldOutlined,
  BoxPlotOutlined,
  StopOutlined,
  BorderOutlined,
  SmileOutlined,
  GatewayOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other = {
  id: 'configuration',
  title: <FormattedMessage id="lbl.configuration" />,
  type: 'group',
  children: [
    {
      id: 'configuration-page',
      title: <FormattedMessage id="lbl.configuration" />,
      type: 'item',
      url: '/configuration',
      icon: icons.ChromeOutlined
    }
  ]
};

export default other;
