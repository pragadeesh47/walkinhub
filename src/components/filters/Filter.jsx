import React from "react";
import Select from "react-select";
import { cityOptions } from "../../utils/cities";
import "./Filter.css";

export default function Filter({
  location,
  onLocationChange,
}) {
  return (
    <div className="filter-container">
      <div className="select-box">
        <Select
          options={cityOptions}
          value={location}
          onChange={onLocationChange}
          placeholder="Location"
          isClearable
          isSearchable
          classNamePrefix="custom-select"
        />
      </div>
    </div>
  );
}