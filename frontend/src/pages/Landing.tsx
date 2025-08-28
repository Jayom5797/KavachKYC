import React from 'react';
import { Link } from 'react-router-dom'
import DotsBackground from '../components/DotsBackground';
import archLight from '../assets/archlight.png';
import archDark from '../assets/archdark.png';

export default function Landing() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetZoom();
  };

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <section>
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <DotsBackground />
        {/* subtle overlay to improve text contrast */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/25 to-white/10 dark:from-neutral-900/60 dark:to-neutral-900/25" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pt-16 pb-20 sm:pt-24 sm:pb-28 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 dark:from-emerald-400 dark:to-sky-400">
                KavachKYC
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
                  AI-Powered KYC Document Validator
                </span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 dark:text-neutral-300 max-w-3xl mx-auto">
                Seamlessly validate identity documents with our intelligent, AI-driven platform. KavachKYC leverages advanced OCR and generative AI to deliver fast, accurate, and structured KYC verification, mitigating fraud and ensuring compliance.
              </p>
              <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3">
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-3 text-white shadow-lg transition-transform duration-200 hover:scale-105"
                >
                  Validate a Document
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-md border px-5 py-3 border-gray-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="py-8 border-t border-b border-gray-200 dark:border-neutral-800">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                    <StatItem value="99.5%" label="Extraction Accuracy" />
                    <StatItem value="< 2s" label="Real-time Validation" />
                    <StatItem value="256-bit" label="AES Encryption" />
                    <StatItem value="100%" label="Secure & Compliant" />
                </div>
            </div>
        </div>
      </div>

      <div id="features" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">A Smarter Way to Verify Identity</h2>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">Our core features are designed for accuracy, speed, and scalability.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature icon={<IconScan />} title="High-Precision OCR">
            Utilizes advanced image pre-processing and the OCR.Space API to ensure accurate text extraction from a wide range of document types.
          </Feature>
          <Feature icon={<IconBrain />} title="Intelligent AI Analysis">
            Leverages Google's Gemini Vision model to not only read but *understand* document data, cross-verifying fields and flagging inconsistencies.
          </Feature>
          <Feature icon={<IconFile />} title="Actionable JSON Reports">
            Receive clear, structured JSON output detailing the validation status (Valid, Suspicious, Fraud) and extracted data, ready for system integration.
          </Feature>
          <Feature icon={<IconShield />} title="Secure & Scalable">
            Built on a modern, robust stack, ensuring your data is handled securely and the platform is ready to scale with your business needs.
          </Feature>
          <Feature icon={<IconCode />} title="Developer-First Experience">
            A clean, intuitive interface with a persistent dark/light theme designed for operational efficiency and ease of use.
          </Feature>
          <Feature icon={<IconArch />} title="Extensible Architecture">
            Designed with a flexible backend that can be extended with features like an admin dashboard and long-term storage via Supabase.
          </Feature>
        </div>
      </div>

      <div id="core-modules" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Core Modules</h2>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">An overview of the key components driving KavachKYC.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ModuleCard 
                icon={<IconUpload />} 
                title="Document Upload & Pre-processing" 
                description="Securely upload documents with automatic image enhancement and preparation for analysis."
            />
            <ModuleCard 
                icon={<IconScan />} 
                title="AI-Powered OCR Engine" 
                description="High-accuracy text extraction from various ID documents using the advanced OCR.space API."
            />
            <ModuleCard 
                icon={<IconBrain />} 
                title="Generative AI Validation" 
                description="Leverages Google's Gemini model for intelligent data validation, structuring, and fraud detection."
            />
            <ModuleCard 
                icon={<IconFile />} 
                title="Structured Data Output" 
                description="Delivers verified data in a clean, structured, and ready-to-use JSON format for easy integration."
            />
        </div>
      </div>

      <div id="tech-stack" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Technology Stack</h2>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">Built with modern, scalable, and reliable technologies.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TechStackCard 
                icon={<IconCode />} 
                title="Frontend" 
                stackItems={["React", "TypeScript", "TailwindCSS", "Vite"]} 
            />
            <TechStackCard 
                icon={<IconServer />} 
                title="Backend" 
                stackItems={["Node.js", "Express.js", "TypeScript"]} 
            />
            <TechStackCard 
                icon={<IconBrain />} 
                title="AI & ML" 
                stackItems={["Google Gemini", "OCR.space API", "TensorFlow.js"]} 
            />
            <TechStackCard 
                icon={<IconCloud />} 
                title="Infrastructure" 
                stackItems={["Vercel", "Supabase", "Docker"]} 
            />
        </div>
      </div>

      <div id="architecture" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">System Architecture</h2>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">A high-level overview of the data flow and component interactions.</p>
        </div>
        <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 p-4 backdrop-blur-md">
            <button onClick={() => setIsModalOpen(true)} className="w-full transition-transform duration-200 hover:scale-[1.02] block" aria-label="View System Architecture in Fullscreen">
              <img src={isDark ? archDark : archLight} alt="System Architecture Diagram" className="w-full h-auto rounded-lg" />
            </button>
        </div>
      </div>

      <div id="team" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Meet the Team</h2>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">The minds behind the innovation at KavachKYC.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TeamMember 
            name="Om Singh" 
            role="Team Lead & Backend Developer"
            github="https://github.com/Jayom5797"
            linkedin="https://www.linkedin.com/in/5797omsingh"
          />
          <TeamMember 
            name="Vikas Tiwari" 
            role="Frontend Developer"
            github="https://github.com/Cyberexe1"
            linkedin="https://www.linkedin.com/in/vikas-tiwari-37b069326/"
          />
          <TeamMember 
            name="Utsav Singh" 
            role="AI & Machine Learning Expert"
            github="https://github.com/Utsav-Singh-35"
            linkedin="https://www.linkedin.com/in/utsavsingh35/"
          />
          <TeamMember 
            name="Ankit Sharma" 
            role="DevOps Specialist"
            github="https://github.com/sharmaankit29"
            linkedin="https://www.linkedin.com/in/ankit-sharma-239526289/"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <div className="rounded-xl bg-emerald-600/10 dark:bg-emerald-500/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Streamline Your Verification Process</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-300">Integrate KavachKYC today and experience the future of automated identity verification. Get started with a single upload.</p>
          </div>
          <Link to="/upload" className="flex-shrink-0 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-3 text-white shadow-lg transition-transform duration-200 hover:scale-105">
            Validate a Document
          </Link>
        </div>
      </div>
    </section>
    
    {/* Modal for fullscreen architecture diagram */}
    {isModalOpen && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={closeModal}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-full h-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div 
            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img 
              src={isDark ? archDark : archLight} 
              alt="System Architecture Diagram (Fullscreen)" 
              className="rounded-lg select-none pointer-events-none"
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
            />
          </div>
          
          {/* Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button 
              onClick={() => setZoom(prev => Math.min(prev * 1.2, 3))}
              className="text-white bg-neutral-800/80 rounded-full p-2 hover:bg-neutral-900/80 transition-colors"
              aria-label="Zoom In"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button 
              onClick={() => setZoom(prev => Math.max(prev * 0.8, 0.5))}
              className="text-white bg-neutral-800/80 rounded-full p-2 hover:bg-neutral-900/80 transition-colors"
              aria-label="Zoom Out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
              </svg>
            </button>
            <button 
              onClick={resetZoom}
              className="text-white bg-neutral-800/80 rounded-full p-2 hover:bg-neutral-900/80 transition-colors text-xs"
              aria-label="Reset Zoom"
            >
              1:1
            </button>
          </div>

          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-neutral-800/80 rounded-full p-2 hover:bg-neutral-900/80 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )}
    </>
  );
}

function TeamMember({ name, role, github, linkedin }: { name: string; role: string; github: string; linkedin: string }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="text-center p-5 rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md transition-all hover:shadow-xl hover:border-emerald-400/60 dark:hover:border-emerald-500/60 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-neutral-700/50 text-gray-400 dark:text-neutral-500 mx-auto mb-4 flex items-center justify-center">
            <IconUser />
        </div>
        <h4 className="font-semibold text-gray-800 dark:text-white">{name}</h4>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{role}</p>
        
        {/* Social Links - Show on Hover */}
        <div className={`absolute inset-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-xl flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors duration-200"
            aria-label={`${name}'s GitHub`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
            aria-label={`${name}'s LinkedIn`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
    </div>
  )
}

// SVG Icons for Features
const IconScan = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l-.259-1.035a3.375 3.375 0 00-2.456-2.456L13.15 16.5l1.035-.259a3.375 3.375 0 002.456-2.456l.259-1.035.259 1.035a3.375 3.375 0 002.456 2.456l1.035.259-1.035.259a3.375 3.375 0 00-2.456 2.456l-.259 1.035z" /></svg>;
const IconFile = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;
const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>;
const IconArch = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6A1.125 1.125 0 012.25 10.875v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" /></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const IconServer = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" /></svg>;
const IconCloud = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.43-2.43A3.75 3.75 0 0013.5 4.5h-1.5a3.75 3.75 0 00-3.75 3.75m10.5 0a4.5 4.5 0 00-4.5-4.5h-1.5a4.5 4.5 0 00-4.5 4.5m16.5 0a3.75 3.75 0 00-3.75-3.75M4.5 15.75l-1.5-1.5" /></svg>;
const IconUpload = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-sky-600 dark:from-emerald-400 dark:to-sky-400">{value}</p>
      <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">{label}</p>
    </div>
  )
}


function ModuleCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 p-5 backdrop-blur-md flex gap-4">
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-emerald-600 dark:text-emerald-400">{icon}</div>
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">{description}</p>
      </div>
    </div>
  )
}

function Feature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 p-5 backdrop-blur-md">
      <div className="w-8 h-8 flex items-center justify-center text-emerald-600 dark:text-emerald-400">{icon}</div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-neutral-400 pl-11">{children}</p>
    </div>
  )
}

function TechStackCard({ icon, title, stackItems }: { icon: React.ReactNode; title: string; stackItems: string[] }) {
  return (
    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 p-5 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 flex items-center justify-center text-emerald-600 dark:text-emerald-400">{icon}</div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <ul className="space-y-1.5 pl-11">
        {stackItems.map((item) => (
          <li key={item} className="text-sm text-gray-600 dark:text-neutral-400 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
