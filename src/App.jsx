import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrientationHomePage from './pages/OrientationHomePage';
import WelcomeScreen from './pages/enrollment/WelcomeScreen';
import ProfileSetupScreen from './pages/enrollment/ProfileSetupScreen';
import CohortRosterScreen from './pages/enrollment/CohortRosterScreen';
import OrientationPreviewScreen from './pages/enrollment/OrientationPreviewScreen';
import StudentInfoCenterScreen from './pages/enrollment/StudentInfoCenterScreen';
import FlyingPointsDemo from './pages/FlyingPointsDemo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default: start at enrollment welcome */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Phase 1: Enrollment Day flow (5 steps) */}
        <Route path="/enrollment/welcome" element={<WelcomeScreen />} />
        <Route path="/enrollment/profile" element={<ProfileSetupScreen />} />
        <Route path="/enrollment/roster" element={<CohortRosterScreen />} />
        <Route path="/enrollment/preview" element={<OrientationPreviewScreen />} />
        <Route path="/enrollment/info-center" element={<StudentInfoCenterScreen />} />

        {/* Phase 2: Orientation Home */}
        <Route path="/home" element={<OrientationHomePage />} />

        {/* Demo: Flying points animation */}
        <Route path="/demo-flying" element={<FlyingPointsDemo />} />

        {/* Original learning path (preserved) */}
        <Route path="/learning-path" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
