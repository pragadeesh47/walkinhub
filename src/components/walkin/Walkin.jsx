import React, { useEffect, useState } from 'react';
import "./Walkin.css";
import JobCard from './JobCard';
import { supabase } from '../../utils/supabaseClient'; // import your client
import Loader from '../loader/Loader';
import SearchBar from '../search/SearchBar';
import Filter from '../filters/Filter';

const Walkin = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = (data) => {
    setSearchQuery(data.target.value);
  }



  const fetchJobs = async () => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .gt('walkin_date_to', today)
      .order('walkin_date_from', { ascending: true }); // example ordering

    if (error) {
      console.error('Error fetching jobs:', error.message);
      setLoading(false);
      return;
    }
    setJobs(data);
    setFilteredJobs(data);
    setLoading(false);
  };

  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const jobTypes = ["Full-time", "Part-time", "Contract"];

  const handleLocationChange = (data) => {
    setLocation(data);
  }
  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  }
  const handleClearFilters = () => {
    setLocation("");
    setJobType("");
    setSearchQuery("")
    filterJobs();
  };

  function filterJobs() {
    var filtered = [...jobs]
    if (searchQuery)
      filtered = filtered.filter(job => job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) || job.role.toLowerCase().includes(searchQuery.toLowerCase()))
    if (location)
      filtered = filtered.filter(job => job.location.toLowerCase() == location.value.toLowerCase())
    if (jobType)
      filtered = filtered.filter(job => job.job_type.toLowerCase() == jobType.toLowerCase())

    if (searchQuery || location || jobType) {
      setFilteredJobs(filtered)
    }
    else {
      if (jobs.length > 0) {
        setFilteredJobs(jobs)
      }
      else {
        fetchJobs()
      }
    }
  }

  useEffect(() => {
    filterJobs();
  }, [searchQuery, location, jobType]);

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <Filter
        location={location}
        onLocationChange={handleLocationChange}
        jobType={jobType}
        onJobTypeChange={handleJobTypeChange}
        onClearFilters={handleClearFilters}
        jobTypes={jobTypes}
      />
      <SearchBar value={searchQuery} onChange={handleSearchQuery} />
      {/* {filteredJobs.length > 0 ? <>
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}</>
        :
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p >No Drives Found</p>
        </div>
      } */}

      <div className="job-list-container">
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>


    </div>
  )
}

export default Walkin