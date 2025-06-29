import React, { useEffect, useState } from 'react';
import "./Walkin.css";
import JobCard from './JobCard';
import { supabase } from '../../utils/supabaseClient'; // import your client
import Loader from '../loader/Loader';
import SearchBar from '../search/SearchBar';
import Filter from '../filters/Filter';
import NoWalkinsFound from '../job-not-found/NoWalkinsFound';

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


  const handleLocationChange = (data) => {
    setLocation(data);
  }
 

  function filterJobs() {
    var filtered = [...jobs]
    if (searchQuery)
      filtered = filtered.filter(job => job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) || job.role.toLowerCase().includes(searchQuery.toLowerCase()))
    if (location)
      filtered = filtered.filter(job => job.location.toLowerCase() == location.value.toLowerCase())
    

    if (searchQuery || location) {
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
  }, [searchQuery, location]);

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      <Filter
        location={location}
        onLocationChange={handleLocationChange}
      />
      <SearchBar value={searchQuery} onChange={handleSearchQuery} />

      <div className="job-list-container">
        {filteredJobs.length > 0 ? <>
          {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
        </> :<><NoWalkinsFound/></>}
        
      </div>


    </div>
  )
}

export default Walkin