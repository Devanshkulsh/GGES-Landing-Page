import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import AboutSection from './sections/AboutSection'
import AdmissionsSection from './sections/AdmissionsSection'
import HeroSection from './sections/HeroSection'
import JourneySection from './sections/JourneySection'
import PlacementsSection from './sections/PlacementsSection'
import ProgramsSection from './sections/ProgramsSection'
import AdmissionsChatbot from './components/AdmissionsChatbot'
import AdmissionsModal, { AdmissionsModalProvider } from './components/AdmissionsModal'
import WhatsAppWidget from './components/WhatsAppWidget'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <AdmissionsModalProvider>
      <ScrollToTop />
      <Header />
      <main>
        <HeroSection />
        <ProgramsSection />
        <AboutSection />
        <JourneySection />
        <PlacementsSection />
        <AdmissionsSection />
      </main>
      <Footer />
      <AdmissionsChatbot />
      <WhatsAppWidget />
      <AdmissionsModal />
    </AdmissionsModalProvider>
  )
}
