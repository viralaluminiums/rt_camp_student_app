import React from 'react';
import {useParams} from 'react-router-dom';
import {useDoc} from '../services/useDoc';
import {useMethodService} from '../services/useMethod';
import {OpenPosition} from '../types';

export const JobSingleList = () => {
  const [jobDescription, setJobDescription] = React.useState<OpenPosition>();
  const [completeProfile, setCompleteProfile] = React.useState(true);
  const [alreadyApplied, setAlreadyApplied] = React.useState<boolean | string>(
    false
  );
  const {job} = useParams();

  const getJobDescription = async () => {
    try {
      const doc = await useDoc('Open Position', job as string);
      setJobDescription(doc.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isProfileComplete = async () => {
    try {
      const resp = await useMethodService(
        'rtcamp_assignment.api.profile.is_profile_complete'
      );
      setCompleteProfile(resp.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const appliedForJob = async () => {
    try {
      const resp = await useMethodService(
        'rtcamp_assignment.api.profile.already_applied',
        {
          position: job as string,
        }
      );
      const _isAlreadyApplied = resp.data.message;
      if (_isAlreadyApplied)
        setAlreadyApplied('You have Already Applied for the Job');
    } catch (error) {
      console.error(error);
    }
  };

  const applyForJob = async () => {
    try {
      await useMethodService('rtcamp_assignment.api.profile.apply_for_job', {
        position: job as string,
      });
      setAlreadyApplied('Thanks for Applying for the Job');
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getJobDescription();
    isProfileComplete();
    appliedForJob();
  }, []);

  return (
    <div className="relative p-4">
      <div className="max-w-3xl mx-auto">
        {jobDescription ? (
          <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="flex flex-col">
              <h1 className="text-gray-900 font-bold text-4xl">
                {jobDescription.title}
              </h1>
              <span>
                Minimum Experience {jobDescription.minimum_experience} Years
              </span>

              <span>Location : {jobDescription.location}</span>

              {!completeProfile && (
                <p className="text-red-500 text-md mt-2 ">
                  Please Complete Your Profile
                </p>
              )}
              {completeProfile && !alreadyApplied ? (
                <button
                  onClick={applyForJob}
                  className="inline-block w-max py-2 mt-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-black hover:bg-gray-700 border-3 border-blac shadow rounded transition duration-200"
                >
                  Apply
                </button>
              ) : (
                <p className="text-red-500 text-md mt-2 ">{alreadyApplied}</p>
              )}
              <hr />
              <div
                className="my-10"
                dangerouslySetInnerHTML={{
                  __html: jobDescription.job_description,
                }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
