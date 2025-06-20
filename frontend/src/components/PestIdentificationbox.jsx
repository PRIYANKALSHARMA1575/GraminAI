import React from 'react';
import './BoxCommon.css';
import { useNavigate } from 'react-router-dom';

export default function PestIdentificationbox() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/pest-identification'); 
  };

  return (
    <div>
      
      <h3 className="box-title" onClick={handleClick}>Pest Alerts</h3>
      <p>Information and prevention tips for pest outbreaks...</p>
    </div>
  );
}
