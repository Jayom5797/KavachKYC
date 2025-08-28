import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DotsBackground from '../components/DotsBackground'

export default function Upload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const navigate = useNavigate()

  const handleFileSelect = (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(file => 
      file.type.startsWith('image/') || file.type === 'application/pdf'
    )
    
    if (validFiles.length !== fileArray.length) {
      alert('Some files were skipped. Please select only image or PDF files.')
    }
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles].slice(0, 5)) // Max 5 documents
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) handleFileSelect(files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (selectedFiles.length > 0) {
      navigate('/processing', { state: { files: selectedFiles } })
    }
  }

  return (
    <div className="min-h-screen relative">
      <DotsBackground />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/25 to-white/10 dark:from-neutral-900/60 dark:to-neutral-900/25" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 dark:from-emerald-400 dark:to-sky-400 mb-4">
            Document Validation
          </h1>
          <p className="text-lg text-gray-700 dark:text-neutral-300 max-w-2xl mx-auto">
            Upload your KYC document for AI-powered validation. Our advanced OCR and machine learning algorithms ensure accurate and secure verification.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Upload Multiple Documents</h2>
            <p className="text-gray-600 dark:text-neutral-400">Upload up to 5 documents for comprehensive KYC verification. We'll check if all documents belong to the same person.</p>
          </div>
          
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              selectedFiles.length > 0
                ? 'border-emerald-400 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' 
                : isDragOver 
                  ? 'border-sky-400 dark:border-sky-500 bg-sky-50/50 dark:bg-sky-900/20'
                  : 'border-gray-300 dark:border-neutral-600 hover:border-gray-400 dark:hover:border-neutral-500'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*,application/pdf"
              multiple
              className="hidden"
              id="file-input"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            />
            
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                <svg className="w-8 h-8 text-gray-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {isDragOver ? 'Drop your files here' : 'Drag and drop your documents'}
                </p>
                <p className="text-gray-600 dark:text-neutral-400 mb-4">
                  Supports: JPG, PNG, PDF • Max 5 files • Max size: 10MB each
                </p>
                
                <button
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-3 text-white shadow-lg transition-transform duration-200 hover:scale-105"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Choose Files
                </button>
              </div>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Selected Documents ({selectedFiles.length}/5)</h3>
              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{file.name}</p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            disabled={selectedFiles.length === 0}
            onClick={handleSubmit}
            className={`inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 ${
              selectedFiles.length > 0
                ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:scale-105 hover:shadow-xl' 
                : 'bg-gray-300 dark:bg-neutral-700 text-gray-500 dark:text-neutral-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Validate Documents ({selectedFiles.length})
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">High-Precision OCR</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">Advanced text extraction with 99.5% accuracy</p>
          </div>
          
          <div className="text-center p-6 rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
              <svg className="w-6 h-6 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">AI Validation</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">Intelligent fraud detection and verification</p>
          </div>
          
          <div className="text-center p-6 rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Secure Processing</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">256-bit encryption and secure data handling</p>
          </div>
        </div>
      </div>
    </div>
  )
}
