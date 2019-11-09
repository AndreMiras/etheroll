import ReactGA from 'react-ga';


function fireTracking() {
  // ReactGA.pageview(window.location.hash);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function setupGA() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);
  fireTracking();
}

export default setupGA;
