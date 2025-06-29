import React, { useState } from "react";
import Select from "react-select";

const cityOptions = [
    { value: "Bangalore", label: "Bangalore (Bengaluru), Karnataka" },
    { value: "Hyderabad", label: "Hyderabad, Telangana" },
    { value: "Pune", label: "Pune, Maharashtra" },
    { value: "Chennai", label: "Chennai, Tamil Nadu" },
    { value: "Gurgaon", label: "Gurgaon (Gurugram), Haryana" },
    { value: "Noida", label: "Noida, Uttar Pradesh" },
    { value: "Ahmedabad", label: "Ahmedabad, Gujarat" },
    { value: "Mumbai", label: "Mumbai, Maharashtra" },
    { value: "Delhi", label: "Delhi, National Capital Territory" },
    { value: "Coimbatore", label: "Coimbatore, Tamil Nadu" },
    { value: "Indore", label: "Indore, Madhya Pradesh" },
    { value: "Mysore", label: "Mysore, Karnataka" },
    { value: "Visakhapatnam", label: "Visakhapatnam, Andhra Pradesh" },
    { value: "Nagpur", label: "Nagpur, Maharashtra" },
    { value: "Jaipur", label: "Jaipur, Rajasthan" },
    { value: "Lucknow", label: "Lucknow, Uttar Pradesh" },
    { value: "Trivandrum", label: "Trivandrum (Thiruvananthapuram), Kerala" },
    { value: "Kochi", label: "Kochi, Kerala" },
    { value: "Guwahati", label: "Guwahati, Assam" },
    { value: "Ranchi", label: "Ranchi, Jharkhand" },
    { value: "Dehradun", label: "Dehradun, Uttarakhand" },
    { value: "Mangalore", label: "Mangalore, Karnataka" },
    { value: "Surat", label: "Surat, Gujarat" },
    { value: "Bhavnagar", label: "Bhavnagar, Gujarat" },
    { value: "Vadodara", label: "Vadodara, Gujarat" },
    { value: "Bhubaneswar", label: "Bhubaneswar, Odisha" },
    { value: "Vijayawada", label: "Vijayawada, Andhra Pradesh" },
    { value: "Guntur", label: "Guntur, Andhra Pradesh" },
    { value: "Rajkot", label: "Rajkot, Gujarat" },
    { value: "Aurangabad", label: "Aurangabad, Maharashtra" },
    { value: "Thane", label: "Thane, Maharashtra" },
    { value: "Gwalior", label: "Gwalior, Madhya Pradesh" },
    { value: "Jodhpur", label: "Jodhpur, Rajasthan" },
    { value: "Udaipur", label: "Udaipur, Rajasthan" },
    { value: "Amritsar", label: "Amritsar, Punjab" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Silvassa", label: "Silvassa (Dadra and Nagar Haveli)" },
    { value: "Jamshedpur", label: "Jamshedpur, Jharkhand" },
    { value: "Nashik", label: "Nashik, Maharashtra" },
    { value: "Agra", label: "Agra, Uttar Pradesh" },
  
    // Tamil Nadu – major and medium-sized cities
    { value: "Chennai", label: "Chennai, Tamil Nadu" },
    { value: "Coimbatore", label: "Coimbatore, Tamil Nadu" },
    { value: "Madurai", label: "Madurai, Tamil Nadu" },
    { value: "Tiruchirappalli", label: "Tiruchirappalli, Tamil Nadu" },
    { value: "Salem", label: "Salem, Tamil Nadu" },
    { value: "Tirunelveli", label: "Tirunelveli, Tamil Nadu" },
    { value: "Erode", label: "Erode, Tamil Nadu" },
    { value: "Vellore", label: "Vellore, Tamil Nadu" },
    { value: "Thoothukudi", label: "Thoothukudi, Tamil Nadu" },
    { value: "Dindigul", label: "Dindigul, Tamil Nadu" },
    { value: "Thanjavur", label: "Thanjavur, Tamil Nadu" },
    { value: "Nagercoil", label: "Nagercoil, Tamil Nadu" },
    { value: "Cuddalore", label: "Cuddalore, Tamil Nadu" },
    { value: "Kanchipuram", label: "Kanchipuram, Tamil Nadu" },
    { value: "Karur", label: "Karur, Tamil Nadu" },
    { value: "Hosur", label: "Hosur, Tamil Nadu" },
    { value: "Ranipet", label: "Ranipet, Tamil Nadu" },
    { value: "Tiruvannamalai", label: "Tiruvannamalai, Tamil Nadu" },
    { value: "Salem", label: "Salem, Tamil Nadu" },          // (duplicate – you can remove)
    { value: "Nagapattinam", label: "Nagapattinam, Tamil Nadu" },
    { value: "Pudukkottai", label: "Pudukkottai, Tamil Nadu" },
    { value: "Villupuram", label: "Villupuram, Tamil Nadu" },
    { value: "Thiruvallur", label: "Thiruvallur, Tamil Nadu" },
    { value: "Erode", label: "Erode, Tamil Nadu" },          // (duplicate – remove if needed)
    { value: "Virudhunagar", label: "Virudhunagar, Tamil Nadu" },
    { value: "Thoothukudi", label: "Thoothukudi, Tamil Nadu" }, // dup
    { value: "Mayiladuthurai", label: "Mayiladuthurai, Tamil Nadu" },
    { value: "Ranipet", label: "Ranipet, Tamil Nadu" }, // dup
    { value: "Tenkasi", label: "Tenkasi, Tamil Nadu" },
    { value: "Kumbakonam", label: "Kumbakonam, Tamil Nadu" }
  ];
  
export default function CitySelect({changeCity}) {
  const [selectedCity, setSelectedCity] = useState(null);


  return (
    <div style={{zIndex:'1'}}>
      <Select
        options={cityOptions}
        value={selectedCity}
        onChange={setSelectedCity}
        placeholder="Filter By Location"
        isClearable
        isSearchable
      />
    </div>
  );
}
