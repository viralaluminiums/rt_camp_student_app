import {ResponseType} from 'axios';
import {ServerResponse} from 'http';
import {ReactNode} from 'react';

export type RouteType = 'public' | 'private';
export type Params = {
  [key: string]: number | string | (string | number)[];
};
export interface Props {
  children?: ReactNode;
}

export type OpenPosition = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  title: string;
  status: string;
  minimum_experience: number;
  maximum_experience: number;
  location: string;
  job_description: string;
  naming_series: string;
  published: number;
  doctype: string;
};

export type ErrorResponse = {
  response: {
    data: {
      message: string;
      _server_messages: string;
    };
  };
};

export type Profile = {
  full_name: string;
  contact: string;
  date_of_birth: string;
  cgpa: number;
  address: string;
  gender: string;
  resume: string;
};
