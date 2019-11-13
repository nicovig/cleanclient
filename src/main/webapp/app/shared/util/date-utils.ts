import moment from 'moment';

import { APP_TIMESTAMP_FORMAT } from 'app/config/constants';

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_TIMESTAMP_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? moment(date, APP_TIMESTAMP_FORMAT).toDate() : null);
