import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient'; // import your client
import './JobCard.css'; // reuse the same styling
import { FaMapMarkerAlt, FaRegCalendarAlt, FaUserTie, FaLaptopCode } from 'react-icons/fa';
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';
import NotFound from '../not-found/NotFound';


const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    const fetchJob = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error(error.message);
      } else {
        setJob(data);
      }
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  if (loading) return <Loader />;
  if (!job) return <NotFound />;

  return (
    <div className="job-card" style={{ maxWidth: '700px' }}>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Jobs
      </button>

      {/* Header */}
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
            {job.job_type && <span className="job-type">· {job.job_type}</span>}
          </h4>
        </div>
      </div>

      {/* Job Tags */}
      <ul className="job-details">
        <li><FaRegCalendarAlt /><span>{areDatesEqual(job.walkin_date_from, job.walkin_date_to) ? job.walkin_date_from : `${job.walkin_date_from} - ${job.walkin_date_to}`}</span></li>
        <li>
          <FaUserTie />
          <span>
            {job.experience === "fresher"
              ? "Fresher"
              : `${job.experience_from} - ${job.experience_to} Years`}
          </span>
        </li>
        <li><FaMapMarkerAlt /><span>{job.location}</span></li>
      </ul>

      {/* Description */}
      <div
        style={{
          marginTop: '20px',
          padding: '12px 16px',
          backgroundColor: '#f7f7f7',
          borderRadius: '8px',
          lineHeight: 1.6,
          fontSize: '0.95rem',
          color: '#333',
          border: '1px solid #e0e0e0',
        }}
        dangerouslySetInnerHTML={{ __html: job.job_description }}
      />
    </div>
  );
};

export default JobDetail;