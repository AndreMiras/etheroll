import ReactGA from 'react-ga';


const fireTracking = () => (
  ReactGA.pageview(window.location.pathname + window.location.search)
);

const setupGA = () => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);
  fireTracking();
};

export default setupGA;
