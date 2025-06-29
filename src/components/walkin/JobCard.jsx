import React from 'react';
import './JobCard.css';
import { FaMapMarkerAlt, FaRegCalendarAlt, FaUserTie, FaLaptopCode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const areDatesEqual = (date1, date2) => {
    return new Date(date1).getTime() === new Date(date2).getTime();
  };

  const BinaryToImage = (profile) => {
    // Convert binary data back to base64
    const result = JSON.parse(profile);
    const base64 = btoa(result);
    return base64;
  };

  return (
    <div className="job-card jc" onClick={() => {
      navigate(`/job/${job.role}/${job.id}`)
    }}>
      <div className="card-header">
        {job.logo_url ? (
          <img src={`data:image/png;base64,${BinaryToImage(job.logo_url)}`} alt={`${job.company_name} logo`} className="company-logo" />
        ) : (
          <div className="logo-placeholder">{job.company_name.charAt(0)}</div>
        )}

        <div className="company-info">
          <h2 className="company-name">{job.company_name}</h2>
          <h4 className="job-role">
            {job.role}
            {job.job_type && <span className="job-type">· {job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)}</span>}
          </h4>
        </div>

      </div>

      <ul className="job-details">
        <li><FaRegCalendarAlt /><span>{areDatesEqual(job.walkin_date_from, job.walkin_date_to) ? job.walkin_date_from : `${job.walkin_date_from} - ${job.walkin_date_to}`}</span></li>
        <li><FaUserTie /><span>{job.experience === "fresher" ? "Fresher" : job.experience_from == job.experience_to ? `${job.experience_from} Years` : `${job.experience_from} - ${job.experience_to} Years`}</span></li>
        <li><FaMapMarkerAlt /><span>{job.location}</span></li>
      </ul>
    </div>
  );
};

export default JobCard;