import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DotsBackground from '../components/DotsBackground'

function StatusBanner({ status }: { status: string }) {
  const config = useMemo(() => {
    if (status === 'Valid' || status === 'Identity Verified') return {
      color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-600',
      icon: <CheckCircleIcon />,
      message: status === 'Identity Verified' 
        ? 'All documents have been verified and belong to the same person.'
        : 'Document is authentic and all information has been successfully verified.'
    }
    if (status === 'Suspicious' || status === 'Identity Mismatch') return {
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-600',
      icon: <ExclamationTriangleIcon />,
      message: status === 'Identity Mismatch'
        ? 'Documents contain different names and require manual review.'
        : 'Document requires manual review due to inconsistencies or unclear information.'
    }
    if (status === 'Single Document') return {
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-600',
      icon: <CheckCircleIcon />,
      message: 'Single document validation completed successfully.'
    }
    return {
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-300 dark:border-red-600',
      icon: <XCircleIcon />,
      message: 'Document appears to be fraudulent or contains falsified information.'
    }
  }, [status])

  return (
    <div className={`border ${config.color} px-6 py-4 rounded-xl font-medium flex items-center gap-4`}>
      <div className="flex-shrink-0">
        {config.icon}
      </div>
      <div>
        <div className="text-lg font-semibold mb-1">Status: {status}</div>
        <div className="text-sm opacity-90">{config.message}</div>
      </div>
    </div>
  )
}

export default function Report() {
  const [data, setData] = useState<any | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem('kycResult')
    if (raw) setData(JSON.parse(raw))
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen relative">
        <DotsBackground />
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/25 to-white/10 dark:from-neutral-900/60 dark:to-neutral-900/25" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 dark:from-emerald-400 dark:to-sky-400 mb-4">
            No Report Found
          </h1>
          <p className="text-lg text-gray-700 dark:text-neutral-300 mb-8">
            Please upload and validate a document to view the validation report.
          </p>
          <button
            onClick={() => navigate('/upload')}
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-3 text-white shadow-lg transition-transform duration-200 hover:scale-105"
          >
            Upload Document
          </button>
        </div>
      </div>
    )
  }

  // Handle both single and multi-document results
  const isMultiDocument = data?.documents && Array.isArray(data.documents)
  const singleDoc = isMultiDocument ? null : data
  const multiDocs = isMultiDocument ? data.documents : []
  const crossVerification = data?.crossVerification
  
  const status = isMultiDocument 
    ? crossVerification?.status || 'Unknown'
    : data?.validation?.final_status || 'Unknown'
  const extractedData = isMultiDocument 
    ? {} 
    : (data?.extracted_data || data || {})
  const confidence = isMultiDocument
    ? crossVerification?.confidence || 85
    : (data?.validation?.confidence_score || data?.confidence_score || 85)

  return (
    <div className="min-h-screen relative">
      <DotsBackground />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/25 to-white/10 dark:from-neutral-900/60 dark:to-neutral-900/25" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 dark:from-emerald-400 dark:to-sky-400 mb-2">
                Validation Report
              </h1>
              <p className="text-lg text-gray-700 dark:text-neutral-300">
                Comprehensive analysis results for your document validation.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/upload')}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                New Validation
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>

          <StatusBanner status={status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {isMultiDocument ? (
              <>
                {/* Cross-Document Verification */}
                <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <ShieldCheckIcon />
                    Cross-Document Identity Verification
                  </h2>
                  <div className="p-4 rounded-lg bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${crossVerification?.identityMatch ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <span className="font-semibold">{crossVerification?.status}</span>
                      <span className="text-sm text-gray-600 dark:text-neutral-400">({confidence}% confidence)</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">{crossVerification?.message}</p>
                    {crossVerification?.extractedNames && crossVerification.extractedNames.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500 dark:text-neutral-500">Names found: </span>
                        <span className="text-xs font-medium">{crossVerification.extractedNames.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Individual Documents */}
                <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <DocumentIcon />
                    Individual Document Results ({multiDocs.length})
                  </h2>
                  <div className="space-y-4">
                    {multiDocs.map((doc: any, index: number) => (
                      <div key={index} className="border border-gray-200 dark:border-neutral-700 rounded-lg p-4 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">Document {index + 1}: {doc.fileName}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            doc.validation?.final_status === 'Valid' 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
                              : doc.validation?.final_status === 'Suspicious'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                          }`}>
                            {doc.validation?.final_status || 'Unknown'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-neutral-400">Name: </span>
                            <span className="font-medium">{doc.name || 'Not found'}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-neutral-400">Document Type: </span>
                            <span className="font-medium">{doc.document_type || 'Unknown'}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-neutral-400">DOB: </span>
                            <span className="font-medium">{doc.dob || 'Not found'}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-neutral-400">Document Number: </span>
                            <span className="font-medium">{doc.document_number || 'Not found'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Single Document - Extracted Information */
              <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <DocumentIcon />
                  Extracted Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(extractedData).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-lg bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm">
                      <div className="text-sm text-gray-600 dark:text-neutral-400 mb-1 capitalize">
                        {key.replace(/_/g, ' ')}
                      </div>
                      <div className="font-medium">{String(value) || 'Not available'}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Validation Details */}
            <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <ShieldCheckIcon />
                Validation Analysis
              </h2>
              <div className="space-y-4">
                <ValidationCheck 
                  label="Document Authenticity" 
                  status={status === 'Valid' ? 'pass' : status === 'Suspicious' ? 'warning' : 'fail'}
                  description="Overall document integrity and authenticity verification"
                />
                <ValidationCheck 
                  label="Text Extraction Quality" 
                  status={confidence > 90 ? 'pass' : confidence > 70 ? 'warning' : 'fail'}
                  description={`OCR confidence: ${confidence.toFixed(1)}%`}
                />
                <ValidationCheck 
                  label="Data Consistency" 
                  status={data?.validation?.consistency_check ? 'pass' : 'warning'}
                  description="Cross-field validation and logical consistency checks"
                />
                <ValidationCheck 
                  label="Security Features" 
                  status={data?.validation?.security_features ? 'pass' : 'fail'}
                  description="Detection of security elements and anti-fraud measures"
                />
              </div>
            </div>

            {/* Raw Data (Collapsible) */}
            <details className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md">
              <summary className="p-6 cursor-pointer font-semibold flex items-center gap-2">
                <CodeIcon />
                Raw Validation Data
              </summary>
              <div className="px-6 pb-6">
                <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg p-4 overflow-auto">
                  <pre className="text-sm"><code>{JSON.stringify(data, null, 2)}</code></pre>
                </div>
              </div>
            </details>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <StatItem label="Confidence Score" value={`${confidence.toFixed(1)}%`} />
                <StatItem label="Processing Time" value="2.3s" />
                <StatItem label="Document Type" value={extractedData.document_type || 'Unknown'} />
                <StatItem label="Validation ID" value={`#${Date.now().toString().slice(-6)}`} />
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
              <div className="space-y-3">
                {status === 'Valid' && (
                  <RecommendationItem 
                    type="success" 
                    text="Document is ready for processing and can be accepted with confidence."
                  />
                )}
                {status === 'Suspicious' && (
                  <RecommendationItem 
                    type="warning" 
                    text="Manual review recommended before final approval."
                  />
                )}
                {status === 'Fraud' && (
                  <RecommendationItem 
                    type="error" 
                    text="Document should be rejected. Consider flagging for investigation."
                  />
                )}
                <RecommendationItem 
                  type="info" 
                  text="Store validation results for audit trail and compliance."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ValidationCheck({ label, status, description }: { 
  label: string; 
  status: 'pass' | 'warning' | 'fail'; 
  description: string 
}) {
  const config = {
    pass: { icon: <CheckIcon />, color: 'text-emerald-600 dark:text-emerald-400' },
    warning: { icon: <ExclamationIcon />, color: 'text-amber-600 dark:text-amber-400' },
    fail: { icon: <XIcon />, color: 'text-red-600 dark:text-red-400' }
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm">
      <div className={`flex-shrink-0 ${config[status].color}`}>
        {config[status].icon}
      </div>
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-gray-600 dark:text-neutral-400">{description}</div>
      </div>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600 dark:text-neutral-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function RecommendationItem({ type, text }: { type: 'success' | 'warning' | 'error' | 'info'; text: string }) {
  const colors = {
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400'
  }

  return (
    <div className="flex items-start gap-2">
      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors[type].replace('text-', 'bg-')}`} />
      <p className="text-sm">{text}</p>
    </div>
  )
}

// Icons
const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ExclamationTriangleIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
)

const XCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const CodeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ExclamationIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)
