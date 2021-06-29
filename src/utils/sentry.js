import * as Sentry from '@sentry/browser';
import { version } from '../../package.json';

const setupSentry = () => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: version,
  });
};

export default setupSentry;
