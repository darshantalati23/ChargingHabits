import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import DeviceAnalysis from './pages/DeviceAnalysis';
import StatisticalFindings from './pages/StatisticalFindings';
import BeyondPaper from './pages/BeyondPaper';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/devices" element={<DeviceAnalysis />} />
            <Route path="/stats" element={<StatisticalFindings />} />
            <Route path="/deep" element={<BeyondPaper />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
