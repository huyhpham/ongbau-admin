import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect } from 'react';
import { useRoutes, Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import withTracker from "./withTracker";
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

const App = () => {
  //const routing = useRoutes(routes);
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname === '/login') {
      localStorage.clear();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* {routing} */}
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  if (isAuthenticated !== false && route.path === "/login") {
                    return (
                      <route.component {...props} />
                    );
                    
                  } else {
                    if (route.layout !== null) {
                      return (
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>
                      );
                    } else {
                      return (
                        <route.component {...props} />
                      );
                    }
                  }
                })}
              />
            );
          })}
        </Switch>
      </Router>;
    </ThemeProvider>
  );
};

export default App;
