import React, { useEffect, useState, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './JobForm.css';
import { supabase } from '../../utils/supabaseClient';
import Select from 'react-select';
import { cityOptions } from '../../utils/cities';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [jobType, setJobType] = useState('');
  const [walkinDateFrom, setWalkinDateFrom] = useState('');
  const [walkinDateTo, setWalkinDateTo] = useState('');
  const [experience, setExperience] = useState('fresher');
  const [experienceFrom, setExperienceFrom] = useState('');
  const [experienceTo, setExperienceTo] = useState('');
  const [location, setLocation] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const noteText = `<p class="note">Note: The walk-in details are not verified. Please confirm the information directly with the company before attending.</p>`;
  const navigate = useNavigate();

const [base64Image, setBase64Image] = useState('');
  const [binaryImage, setBinaryImage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {

      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target.result;
        // Extract base64 data from Data URL
        const base64String = result.split(',')[1];
        setBase64Image(base64String);


        // Decode base64 to binary
        const binaryString = atob(base64String);
        setLogoFile(file);
        setBinaryImage(binaryString);
      };

      // Read file as Data URL
      reader.readAsDataURL(file);
    }
  };

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle location select change
  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption);
  };



  // Validate experience inputs for 'experienced'
  const isExperienceValid = () => {
    if (experience === 'experienced') {
      if (!experienceFrom || Number(experienceFrom) < 0) return false;
      if (experienceTo && Number(experienceTo) < Number(experienceFrom)) return false;
    }
    return true;
  };

  // Submit form handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!auth.currentUser) {
        toast.error('You must be logged in to post a job.');
        navigate('/login');
        return;
      }

      if (!isExperienceValid()) {
        toast.error('Please provide a valid experience range.');
        return;
      }

      if (!location) {
        toast.error('Please select a location.');
        return;
      }

      setIsSubmitting(true);

      try {

        console.log(logoFile);
        // Prepare walk-in date to fallback to from date if empty
        const walkinTo = walkinDateTo || walkinDateFrom;

        const { data, error } = await supabase.from('jobs').insert([
          {
            company_name: companyName,
            role,
            logo_url: logoFile ? JSON.stringify(binaryImage) : logoFile,
            job_type: jobType,
            walkin_date_from: walkinDateFrom,
            walkin_date_to: walkinTo,
            experience,
            experience_from: experience === 'experienced' ? Number(experienceFrom) : null,
            experience_to: experience === 'experienced' ? (experienceTo ? Number(experienceTo) : null) : null,
            location: location.value,
            job_description: jobDescription + noteText,
          },
        ]);

        if (error) {
          throw error;
        }

        toast.success('Job posted successfully!');
        clearForm();
      } catch (error) {
        toast.error(error.message || 'Error posting job.');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      companyName,
      role,
      logoFile,
      jobType,
      walkinDateFrom,
      walkinDateTo,
      experience,
      experienceFrom,
      experienceTo,
      location,
      jobDescription,
      navigate,
      noteText,
    ]
  );

  // Clear all form fields
  const clearForm = () => {
    setCompanyName('');
    setRole('');
    setLogoFile(null);
    setJobType('');
    setWalkinDateFrom('');
    setWalkinDateTo('');
    setExperience('fresher');
    setExperienceFrom('');
    setExperienceTo('');
    setLocation(null);
    setJobDescription('');
  };

  // TinyMCE editor content change handler
  const handleEditorChange = (content) => {
    setJobDescription(content);
  };

  return (
    <div className="job-form-container">
      <p className="note">
        Please ensure the walk-in details you post are accurate, as it can make a big difference to others’
        opportunities.
      </p>
      <form onSubmit={handleSubmit}>

        {/* Company Name */}
        <div className="form-group">
          <label htmlFor="companyName">
            Company Name<span className="required">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        {/* Role */}
        <div className="form-group">
          <label htmlFor="role">
            Role<span className="required">*</span>
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        {/* Location */}
        <div className="form-group" style={{ zIndex: 1 }}>
          <label htmlFor="location">
            Location<span className="required">*</span>
          </label>
          <Select
            id="location"
            options={cityOptions}
            value={location}
            onChange={handleLocationChange}
            placeholder="Select location"
            isClearable
            isSearchable
            aria-label="Location select"
          />
        </div>

        {/* Logo (Optional) */}
        <div className="form-group">
          <label htmlFor="logo">
            Logo <span className="optional">(Optional)</span>
          </label>
          <input type="file" id="logo" accept="image/*" onChange={(e) => { handleFileChange(e) }} />
        </div>

        {/* Job Type */}
        <div className="form-group">
          <label htmlFor="jobType">
            Job Type<span className="required">*</span>
          </label>
          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        {/* Walk-in Date From */}
        <div className="form-group">
          <label htmlFor="walkinDateFrom">
            Walk-in Date From<span className="required">*</span>
          </label>
          <input
            type="date"
            id="walkinDateFrom"
            value={walkinDateFrom}
            onChange={(e) => setWalkinDateFrom(e.target.value)}
            required
          />
        </div>

        {/* Walk-in Date To */}
        <div className="form-group">
          <label htmlFor="walkinDateTo">
            Walk-in Date To <span className="optional">(Optional)</span>
          </label>
          <input
            type="date"
            id="walkinDateTo"
            value={walkinDateTo}
            onChange={(e) => setWalkinDateTo(e.target.value)}
            min={walkinDateFrom || undefined}
          />
        </div>

        {/* Experience */}
        <div className="form-group">
          <label htmlFor="experience">
            Experience<span className="required">*</span>
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          >
            <option value="fresher">Fresher</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        {/* Experience Range (if Experienced) */}
        {experience === 'experienced' && (
          <>
            <div className="form-group">
              <label htmlFor="experienceFrom">
                Experience From<span className="required">*</span>
              </label>
              <input
                type="number"
                id="experienceFrom"
                min="0"
                value={experienceFrom}
                onChange={(e) => setExperienceFrom(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experienceTo">
                Experience To <span className="optional">(Optional)</span>
              </label>
              <input
                type="number"
                id="experienceTo"
                min={experienceFrom || "0"}
                value={experienceTo}
                onChange={(e) => setExperienceTo(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Job Description */}
        <div className="form-group">
          <label htmlFor="jobDescription">
            Job Description<span className="required">*</span>
          </label>
          <Editor
            apiKey="srqcvthppx937d4zu5vbi58yp2jzhdufol854shcz8cevs0o"
            value={jobDescription}
            onEditorChange={handleEditorChange}
            init={{
              height: 200,
              menubar: false,
              plugins: ['link', 'image', 'lists', 'emoticons'],
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image',
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button className="form-submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;