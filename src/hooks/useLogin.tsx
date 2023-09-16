import {useNavigate} from 'react-router';
import {useMethodService} from '../services/useMethod';
import * as React from 'react';

type AUTH_STAGE = 'LOGIN' | 'LOGOUT' | 'UNKNOWN';

/**
 * A Hook that Roots into Frappe Current User
 * It's has Issue with Cookies and Session Tracking
 * This Hook Checks Session and Do Appropriate Routing
 */
export const useLoggedIn = (stage?: AUTH_STAGE, route?: string) => {
  const [loggedIn, setLoggedIn] = React.useState<AUTH_STAGE>('UNKNOWN');
  const [userInfo, setUserInfo] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (stage && route) {
      if (loggedIn === stage) {
        navigate(route);
      }
    }
  }, [loggedIn]);

  React.useEffect(() => {
    useMethodService('frappe.realtime.get_user_info').then(resp => {
      setLoggedIn(resp.data.message.user !== 'Guest' ? 'LOGIN' : 'LOGOUT');
      setUserInfo(resp.data.message);
    });
  }, []);

  return [loggedIn, userInfo];
};
