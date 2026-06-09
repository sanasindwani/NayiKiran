import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CommunityForum from './pages/CommunityForum';
import LegalRights from './pages/LegalRights'
import Signup from './pages/signup/Signup';
import Chat from './pages/Chat';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import './i18n/i18n';
import Skill from './pages/skill';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import ChildcareProtection from './components/ChildcareProtection';
import SchoolEnrollment from './components/SchoolEnrollment';
import GovernmentSchemes from './components/GovernmentSchemes';
import RTEEligibilityChecker from './components/RTEEligibilityChecker';
import SchoolsMap from './components/SchoolsMap';
import DocumentUpload from './components/DocumentUpload';
import ChildcareProtectionLanding from './pages/ChildcareProtectionLanding';
import ChildcareEligibility from './pages/ChildcareEligibility';
import ChildcareSchools from './pages/ChildcareSchools';
import ChildcareDocuments from './pages/ChildcareDocuments';
import ChildcareApply from './pages/ChildcareApply';
import JobDiscovery from './pages/JobDiscovery';
import VoiceAssistant from './components/VoiceAssistant'; // Added Voice Assistant

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div>
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/story" element={<SuccessStoriesPage />} />

        {/* Protected Routes */}
        <Route path="/chat" element={authUser ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/forum" element={authUser ? <CommunityForum /> : <Navigate to="/login" />} />
        <Route path="/legal" element={<LegalRights /> }/>
        <Route path="/skill" element={authUser ? <Skill /> : <Navigate to="/login" />} />
        
        {/* Childcare Protection Routes */}
        <Route path="/childcare-protection" element={authUser ? <ChildcareProtectionLanding /> : <Navigate to="/login" />} />
        <Route path="/childcare-protection/eligibility" element={authUser ? <ChildcareEligibility /> : <Navigate to="/login" />} />
        <Route path="/childcare-protection/schools" element={authUser ? <ChildcareSchools /> : <Navigate to="/login" />} />
        <Route path="/childcare-protection/documents" element={authUser ? <ChildcareDocuments /> : <Navigate to="/login" />} />
        <Route path="/childcare-protection/apply" element={authUser ? <ChildcareApply /> : <Navigate to="/login" />} />
        
        {/* Job Discovery Routes */}
        <Route path="/job-discovery" element={authUser ? <JobDiscovery /> : <Navigate to="/login" />} />
        {/* Legacy Routes - Keep for backward compatibility */}
        <Route path="/school-enrollment" element={authUser ? <SchoolEnrollment /> : <Navigate to="/login" />} />
        <Route path="/government-schemes" element={authUser ? <GovernmentSchemes /> : <Navigate to="/login" />} />
        <Route path="/rte-eligibility" element={authUser ? <RTEEligibilityChecker /> : <Navigate to="/login" />} />
        <Route path="/schools-map" element={authUser ? <SchoolsMap /> : <Navigate to="/login" />} />
        <Route path="/documents" element={authUser ? <DocumentUpload /> : <Navigate to="/login" />} />

        {/* Authentication Routes */}
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster />
      
      {/* Global Voice Assistant Component */}
      <VoiceAssistant />
    </div>
  );
};

export default App;