import { Box, Grid, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentWrapper from './ComponentWrapper';
import ComponentSkeleton from './ComponentSkeleton';

import { FormattedMessage, useIntl } from 'react-intl';
import useAuth from 'hooks/useAuth';
import SyntaxHighlight from 'components/third-party/SyntaxHighlight';
import { useTheme } from '@emotion/react';

// ==============================|| SAMPLE PAGE ||============================== //

const Configuration = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { user } = useAuth();

  const exempleString = `  import React, { StrictMode } from 'react';
  import * as ReactDOM from 'react-dom/client';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  import * as serviceWorker from './serviceWorker';
  
  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container);
  
  let pageAccessTime = performance.now();
  const clientId = 'thqrlfqesQUBkkYYnVVLQ9rUF3N2';
  const API_URL = 'http://localhost:8080/api/analytics/events';
  const genericEvent = {
    clientId: ${user?.uid},
    browser: navigator.userAgentData?.brands[0]?.brand,
    pagePath: window.location.href,
    pageTitle: document.title,
    eventTime: new Date(),
    platform: navigator.userAgentData.platform,
    language: window.navigator.language,
    mobile: navigator.userAgentData.mobile,
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };
  
  function sendEventToAPI(eventData) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        eventData.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      });
    }
  
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    };
  
    fetch(API_URL, options);
  }
  
  function handleNetworkError(startTime, URL) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    const eventData = {
      ...genericEvent,
      eventType: 'request',
      status: 500,
      responseTime: parseInt(responseTime),
      url: URL,
      errorMessage: 'Network Error',
    };
  
    if (URL !== API_URL) {
      sendEventToAPI(eventData);
    }
  }
  
  function attachFetchInterceptor() {
    const originalFetch = window.fetch;
  
    window.fetch = function (...args) {
      let startTime = performance.now();
      const URL = args[0];
  
      return originalFetch
        .apply(this, args)
        .then((response) => {
          const endTime = performance.now();
          const responseTime = endTime - startTime;
  
          const eventData = {
            ...genericEvent,
            eventType: 'request',
            status: response.status,
            responseTime: parseInt(responseTime),
            url: URL,
          };
  
          if (!response.ok) {
            eventData.errorMessage = response;
          }
  
          if (URL !== API_URL) {
            sendEventToAPI(eventData);
          }
  
          startTime = performance.now();
          return response;
        })
        .catch((error) => {
          handleNetworkError(startTime, URL);
          startTime = performance.now();
          throw error;
        });
    };
  }
  
  attachFetchInterceptor();
  
  function collectClickEvents(event) {
    if (event.target.tagName === 'BUTTON') {
      const eventData = {
        ...genericEvent,
        eventType: event.type,
        target: event.target.nodeName,
        label: event.target.innerText,
      };
      sendEventToAPI(eventData);
    }
  }
  
  document.addEventListener('click', collectClickEvents);
  document.addEventListener('submit', collectClickEvents);
  
  const { pushState } = window.history;
  
  window.history.pushState = function (...args) {
    pushState.apply(window.history, args);
    const startTime = performance.now();
    const duration = startTime - pageAccessTime;
  
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  
    const timeOnPage = \`\${hours}:\${minutes}:\${seconds}\`;
    const eventData = {
      ...genericEvent,
      eventType: 'leave_page',
      referrer: document.referrer,
      timeOnPage: timeOnPage,
    };
  
    pageAccessTime = performance.now();
  
    sendEventToAPI(eventData);
  };
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://cra.link/PWA
  serviceWorker.unregister();
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();  
  `;

  const codeSnippet = `// ${intl.formatMessage({ id: 'lbl.imports' })}
  
  let pageAccessTime = performance.now();
  const clientId = 'thqrlfqesQUBkkYYnVVLQ9rUF3N2';
  const API_URL = 'http://localhost:8080/api/analytics/events';
  const genericEvent = {
    clientId: ${user?.uid},
    browser: navigator.userAgentData?.brands[0]?.brand,
    pagePath: window.location.href,
    pageTitle: document.title,
    eventTime: new Date(),
    platform: navigator.userAgentData.platform,
    language: window.navigator.language,
    mobile: navigator.userAgentData.mobile,
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };
  
  function sendEventToAPI(eventData) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        eventData.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      });
    }
  
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    };
  
    fetch(API_URL, options);
  }
  
  function handleNetworkError(startTime, URL) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    const eventData = {
      ...genericEvent,
      eventType: 'request',
      status: 500,
      responseTime: parseInt(responseTime),
      url: URL,
      errorMessage: 'Network Error',
    };
  
    if (URL !== API_URL) {
      sendEventToAPI(eventData);
    }
  }
  
  function attachFetchInterceptor() {
    const originalFetch = window.fetch;
  
    window.fetch = function (...args) {
      let startTime = performance.now();
      const URL = args[0];
  
      return originalFetch
        .apply(this, args)
        .then((response) => {
          const endTime = performance.now();
          const responseTime = endTime - startTime;
  
          const eventData = {
            ...genericEvent,
            eventType: 'request',
            status: response.status,
            responseTime: parseInt(responseTime),
            url: URL,
          };
  
          if (!response.ok) {
            eventData.errorMessage = response;
          }
  
          if (URL !== API_URL) {
            sendEventToAPI(eventData);
          }
  
          startTime = performance.now();
          return response;
        })
        .catch((error) => {
          handleNetworkError(startTime, URL);
          startTime = performance.now();
          throw error;
        });
    };
  }
  
  attachFetchInterceptor();
  
  function collectClickEvents(event) {
    if (event.target.tagName === 'BUTTON') {
      const eventData = {
        ...genericEvent,
        eventType: event.type,
        target: event.target.nodeName,
        label: event.target.innerText,
      };
      sendEventToAPI(eventData);
    }
  }
  
  document.addEventListener('click', collectClickEvents);
  document.addEventListener('submit', collectClickEvents);
  
  const { pushState } = window.history;
  
  window.history.pushState = function (...args) {
    pushState.apply(window.history, args);
    const startTime = performance.now();
    const duration = startTime - pageAccessTime;
  
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  
    const timeOnPage = \`\${hours}:\${minutes}:\${seconds}\`;
    const eventData = {
      ...genericEvent,
      eventType: 'leave_page',
      referrer: document.referrer,
      timeOnPage: timeOnPage,
    };
  
    pageAccessTime = performance.now();
  
    sendEventToAPI(eventData);
  };


// ${intl.formatMessage({ id: 'lbl.rest_source' })}`;

  return (
    <MainCard title={intl.formatMessage({ id: 'lbl.dashboard_welcome_button' })}>
      <ComponentSkeleton>
        <ComponentWrapper>
          <Grid container spacing={3}>
            <Typography variant="h4" sx={{ fontSize: 18, fontWeight: 'normal' }}>
              <FormattedMessage id="lbl.configuration_header" />
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                <span>{'React'} </span>
              </Box>
              <FormattedMessage id="lbl.configuration_header1" />
            </Typography>
            <Grid item xs={12}>
              <MainCard title="index.js" codeString={exempleString} exempleString={codeSnippet}>
                <SyntaxHighlight>{codeSnippet}</SyntaxHighlight>
                <Typography variant="h4" mt="1.5rem" sx={{ fontSize: 18, fontWeight: 'normal' }}>
                  <FormattedMessage id="lbl.configuration_footer" />
                </Typography>
              </MainCard>
            </Grid>
          </Grid>
        </ComponentWrapper>
      </ComponentSkeleton>
    </MainCard>
  );
};

export default Configuration;
