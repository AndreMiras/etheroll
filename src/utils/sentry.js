import * as Sentry from '@sentry/browser';
import { version } from '../../package.json';

function setupSentry() {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: version,
  });
}

export default setupSentry;
