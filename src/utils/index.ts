import moment from 'moment';

export const getDaysAgo = (current: string) => {
  return moment().diff(current, 'days') > 0
    ? `${moment().diff(current, 'days')} days ago`
    : moment().diff(current, 'hours') > 0
    ? `${moment().diff(current, 'hours')} hours ago`
    : moment().diff(current, 'minutes')
    ? `${moment().diff(current, 'minutes')} minutes ago`
    : `${moment().diff(current, 'seconds')} seconds ago`;
};
