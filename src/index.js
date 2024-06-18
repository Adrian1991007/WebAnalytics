import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';

// scroll bar
import 'simplebar/src/simplebar.css';

// apex-chart
import 'assets/third-party/apex-chart.css';
import 'assets/third-party/react-table.css';

import App from './App';
import { store } from 'store';
import { ConfigProvider } from 'contexts/ConfigContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ReduxProvider store={store}>
    <ConfigProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </ReduxProvider>
);
