import React from 'react';
import Navbar from '../components/Navbar';
import ChatbotBox from '../components/Chatbotbox'; // ✅ Import the correct one
import './Chatbot.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Chatbot() {
  return (
    <div className="chatbot-page">
      <Navbar />
      <div className="chatbot-layout">
        <div className="chatbot-messages">
          <div className="chatbot-qna">
            <div className="qna">
              <p className="question">Q: What is smart farming?</p>
              <p className="answer">A: Smart farming is the use of technology to improve agricultural productivity.</p>
            </div>
            <div className="qna">
              <p className="question">Q: How can AI help in agriculture?</p>
              <p className="answer">A: AI helps by predicting weather, analyzing soil health, and optimizing crop yield.</p>
            </div>
          </div>

          <ChatbotBox /> {/* ✅ Shows actual bot box */}
        </div>
      </div>
    </div>
  );
}
