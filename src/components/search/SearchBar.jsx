import React from "react";
import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by company or job title..."
      value={value}
      onChange={onChange}
      className="search-input"
    />
  );
}