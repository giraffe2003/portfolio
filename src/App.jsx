import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/next'
import FloatingNav from './components/FloatingNav'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CaseStudyInstantPayout from './pages/CaseStudyInstantPayout'
import CaseStudyDashboard from './pages/CaseStudyDashboard'
import CaseStudyProductMarketplace from './pages/CaseStudyProductMarketplace'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* AnimatePresence needs access to location — wrap inside router */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/instant-payout" element={<CaseStudyInstantPayout />} />
        <Route path="/dashboard" element={<CaseStudyDashboard />} />
        <Route path="/product-marketplace" element={<CaseStudyProductMarketplace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FloatingNav />
      <AnimatedRoutes />
      <Analytics />
    </BrowserRouter>
  )
}
