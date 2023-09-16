import React from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {docList} from '../services/docList';
import {getDaysAgo} from '../utils';
import {OpenPosition} from '../types';

export const JobList = () => {
  const [searchParams] = useSearchParams();
  const isLoginSuccess = searchParams.get('message') === 'signup_success';
  const [jobs, setJobs] = React.useState<OpenPosition[]>([]);

  const getJobs = async () => {
    try {
      const jobs = await docList({
        doc: 'Open Position',
        fields: ['*'],
        filters: [['status', '=', 'Open']],
        order_by: 'creation desc',
      });
      setJobs(jobs.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      {isLoginSuccess && (
        <p className="text-green-500 text-center text-md mt-2 ">
          Login Successful
        </p>
      )}
      <ul className="max-w-screen-xl mx-auto my-24 rounded-lg divide-gray-200">
        {jobs.map((each: OpenPosition) => (
          <Link to={`/job/${each.name}`}>
            <li
              key={each.name}
              className="mt-8 px-6 py-4 shadow hover:shadow-lg mx-4"
            >
              <div className="flex justify-between gap-y-4">
                <span className=" block font-semibold text-lg">
                  {each.title}
                </span>

                <span className=" block text-sm font-gray-600 text-lg">
                  {getDaysAgo(each.creation)}
                </span>
              </div>
              <p className="text-gray-700">
                Minimum Experience Required {each.maximum_experience} Years
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};
