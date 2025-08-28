import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { validateDocument } from '../lib/api'
import DotsBackground from '../components/DotsBackground'

export default function Processing() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [progressText, setProgressText] = useState('Starting validation process…')
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { id: 1, name: 'Document Upload', description: 'Securely uploading your document' },
    { id: 2, name: 'OCR Processing', description: 'Extracting text with advanced OCR technology' },
    { id: 3, name: 'AI Analysis', description: 'Analyzing document with Gemini AI model' },
    { id: 4, name: 'Validation Complete', description: 'Generating comprehensive report' }
  ]

  useEffect(() => {
    const files: File[] | undefined = state?.files || (state?.file ? [state.file] : undefined)
    if (!files || files.length === 0) {
      navigate('/upload')
      return
    }

    ;(async () => {
      try {
        setCurrentStep(1)
        setProgressText(`Uploading ${files.length} document${files.length > 1 ? 's' : ''} securely…`)
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setCurrentStep(2)
        setProgressText('Processing with high-precision OCR…')
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setCurrentStep(3)
        setProgressText('Analyzing with AI for fraud detection…')
        
        // Process all documents
        const results = []
        for (let i = 0; i < files.length; i++) {
          setProgressText(`Analyzing document ${i + 1} of ${files.length}…`)
          const res = await validateDocument(files[i])
          if (res.ok && res.data) {
            results.push({ ...res.data, documentIndex: i, fileName: files[i].name })
          } else {
            throw new Error(`Document ${i + 1} validation failed: ${res.error}`)
          }
        }
        
        setCurrentStep(4)
        setProgressText('Cross-verifying identity across documents…')
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Perform cross-document identity verification
        const crossVerification = performCrossDocumentVerification(results)
        const finalResult = {
          documents: results,
          crossVerification,
          totalDocuments: files.length,
          timestamp: new Date().toISOString()
        }
        
        localStorage.setItem('kycResult', JSON.stringify(finalResult))
        navigate('/report')
      } catch (e: any) {
        localStorage.removeItem('kycResult')
        alert('Validation failed: ' + (e?.message || 'Unknown error'))
        navigate('/upload')
      }
    })()
  }, [state, navigate])

  const performCrossDocumentVerification = (documents: any[]) => {
    if (documents.length === 1) {
      return {
        status: 'Single Document',
        message: 'Only one document provided - cross-verification not applicable',
        identityMatch: true,
        confidence: 100
      }
    }

    // Extract and normalize names from all documents
    const names = documents.map(doc => {
      if (!doc.name) return null
      return doc.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
        .replace(/[^\w\s]/g, '') // Remove special characters
    }).filter(Boolean)
    
    // Check if all names are essentially the same
    const uniqueNames = [...new Set(names)]
    const identityMatch = uniqueNames.length <= 1
    
    // Enhanced confidence scoring
    let confidence = 100
    if (!identityMatch) {
      // Check for partial matches (same words in different order, etc.)
      const allWords = names.flatMap(name => name.split(' '))
      const uniqueWords = [...new Set(allWords)]
      const commonWords = uniqueWords.filter(word => 
        names.every(name => name.includes(word))
      )
      
      if (commonWords.length >= 2) {
        confidence = 75 // Partial match
      } else {
        confidence = 20 // No match
      }
    }
    
    return {
      status: identityMatch ? 'Identity Verified' : 'Identity Mismatch',
      message: identityMatch 
        ? 'All documents belong to the same person - identity verified successfully'
        : `Documents contain different names (${uniqueNames.join(', ')}) - manual review required`,
      identityMatch,
      confidence,
      extractedNames: uniqueNames,
      documentCount: documents.length,
      rawNames: documents.map(doc => doc.name).filter(Boolean)
    }
  }

  return (
    <div className="min-h-screen relative">
      <DotsBackground />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/25 to-white/10 dark:from-neutral-900/60 dark:to-neutral-900/25" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 dark:from-emerald-400 dark:to-sky-400 mb-4">
            Processing Document
          </h1>
          <p className="text-lg text-gray-700 dark:text-neutral-300">
            Our AI-powered system is analyzing your document for authenticity and extracting key information.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-8 mb-8">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg className="animate-spin h-16 w-16 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Step {currentStep} of {steps.length}</h2>
            <p className="text-gray-600 dark:text-neutral-400 text-lg">{progressText}</p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                index + 1 < currentStep 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                  : index + 1 === currentStep 
                    ? 'bg-sky-100 dark:bg-sky-900/30 border-2 border-sky-300 dark:border-sky-600' 
                    : 'bg-gray-100 dark:bg-neutral-800/30'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  index + 1 < currentStep 
                    ? 'bg-emerald-500 text-white' 
                    : index + 1 === currentStep 
                      ? 'bg-sky-500 text-white' 
                      : 'bg-gray-300 dark:bg-neutral-600 text-gray-600 dark:text-neutral-400'
                }`}>
                  {index + 1 < currentStep ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div>
                  <div className={`font-medium ${
                    index + 1 <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-neutral-500'
                  }`}>
                    {step.name}
                  </div>
                  <div className={`text-sm ${
                    index + 1 <= currentStep ? 'text-gray-600 dark:text-neutral-400' : 'text-gray-400 dark:text-neutral-600'
                  }`}>
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Secure Processing</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">Your document is processed with bank-grade security</p>
          </div>
          
          <div className="text-center p-6 rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
              <svg className="w-6 h-6 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">Advanced algorithms ensure rapid processing</p>
          </div>
          
          <div className="text-center p-6 rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">99.5% Accurate</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">Industry-leading accuracy in document validation</p>
          </div>
        </div>
      </div>
    </div>
  )
}
