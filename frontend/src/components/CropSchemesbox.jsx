import React from 'react';
import './BoxCommon.css';
import { useNavigate } from 'react-router-dom';

export default function CropSchemesbox() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/schemes');
  };

  return (
    <div className="box-container" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3 className="box-title">Government Schemes</h3>
      <p>Latest updates about government agricultural schemes...</p>
    </div>
  );
}
