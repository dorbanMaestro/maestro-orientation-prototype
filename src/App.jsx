import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrientationHomePage from './pages/OrientationHomePage';
import WelcomeScreen from './pages/enrollment/WelcomeScreen';
import ProfileSetupScreen from './pages/enrollment/ProfileSetupScreen';
import QuestionnaireScreen from './pages/enrollment/QuestionnaireScreen';
import CohortRosterScreen from './pages/enrollment/CohortRosterScreen';
import OrientationPreviewScreen from './pages/enrollment/OrientationPreviewScreen';
import FlyingPointsDemo from './pages/FlyingPointsDemo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default: start at enrollment welcome */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Phase 1: Enrollment Day flow (5 steps) */}
        {/* Step 1: Welcome */}
        <Route path="/enrollment/welcome" element={<WelcomeScreen />} />
        {/* Step 2: Profile */}
        <Route path="/enrollment/profile" element={<ProfileSetupScreen />} />
        {/* Step 3: Onboarding questions */}
        <Route path="/enrollment/questionnaire" element={<QuestionnaireScreen />} />
        {/* Step 4: Cohort roster */}
        <Route path="/enrollment/roster" element={<CohortRosterScreen />} />
        {/* Step 5: Orientation preview */}
        <Route path="/enrollment/preview" element={<OrientationPreviewScreen />} />

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
