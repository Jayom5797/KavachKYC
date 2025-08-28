import React from 'react'
import DotsBackground from '../components/DotsBackground'

export default function Dashboard() {
  const [timeRange, setTimeRange] = React.useState('7d')

  const recentValidations = [
    { id: '1', document: 'Aadhaar Card', name: 'Rajesh Kumar', status: 'Valid', timestamp: '2 hours ago', confidence: 98.5 },
    { id: '2', document: 'PAN Card', name: 'Priya Sharma', status: 'Suspicious', timestamp: '4 hours ago', confidence: 76.2 },
    { id: '3', document: 'Driving License', name: 'Amit Singh', status: 'Valid', timestamp: '6 hours ago', confidence: 94.8 },
    { id: '4', document: 'Voter ID', name: 'Sneha Patel', status: 'Fraud', timestamp: '8 hours ago', confidence: 23.1 },
    { id: '5', document: 'Passport', name: 'Vikram Gupta', status: 'Valid', timestamp: '12 hours ago', confidence: 97.3 },
    { id: '6', document: 'Aadhaar Card', name: 'Anita Desai', status: 'Valid', timestamp: '1 day ago', confidence: 96.7 },
  ]

  return (
    <div className="min-h-screen relative">
      <DotsBackground />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/25 to-white/10 dark:from-neutral-900/60 dark:to-neutral-900/25" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 dark:from-emerald-400 dark:to-sky-400 mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-700 dark:text-neutral-300">
            Real-time insights into document validation performance and security metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Documents Validated" 
            value="12,847" 
            change="+23%" 
            trend="up"
            icon={<DocumentIcon />}
            color="emerald"
          />
          <StatCard 
            title="Fraud Detection Rate" 
            value="2.3%" 
            change="-0.5%" 
            trend="down"
            icon={<ShieldIcon />}
            color="red"
          />
          <StatCard 
            title="Processing Speed" 
            value="1.8s" 
            change="-12%" 
            trend="down"
            icon={<ClockIcon />}
            color="blue"
          />
          <StatCard 
            title="Accuracy Rate" 
            value="99.2%" 
            change="+0.8%" 
            trend="up"
            icon={<CheckIcon />}
            color="purple"
          />
        </div>

        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="flex gap-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                    : 'bg-white/40 dark:bg-neutral-900/40 border border-gray-200/80 dark:border-neutral-800/80 backdrop-blur-md hover:bg-white/60 dark:hover:bg-neutral-900/60'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Validations */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Validations</h2>
              <div className="space-y-4">
                {recentValidations.map((validation) => (
                  <ValidationItem key={validation.id} validation={validation} />
                ))}
              </div>
            </div>
          </div>

          {/* Document Types Chart */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4">Document Types</h3>
              <div className="space-y-3">
                <DocumentTypeItem type="Aadhaar Card" percentage={42} count={5247} />
                <DocumentTypeItem type="PAN Card" percentage={28} count={3597} />
                <DocumentTypeItem type="Driving License" percentage={18} count={2312} />
                <DocumentTypeItem type="Passport" percentage={8} count={1028} />
                <DocumentTypeItem type="Voter ID" percentage={4} count={663} />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4">System Health</h3>
              <div className="space-y-4">
                <HealthMetric label="API Response Time" value="142ms" status="good" />
                <HealthMetric label="OCR Service" value="Online" status="good" />
                <HealthMetric label="AI Model" value="Active" status="good" />
                <HealthMetric label="Database" value="Connected" status="good" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, trend, icon, color }: {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
  color: 'emerald' | 'red' | 'blue' | 'purple'
}) {
  const colorClasses = {
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
  }

  return (
    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center text-sm font-medium ${
          trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {trend === 'up' ? '↗' : '↘'} {change}
        </div>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-600 dark:text-neutral-400">{title}</div>
    </div>
  )
}

function ValidationItem({ validation }: { validation: any }) {
  const statusColors = {
    Valid: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    Suspicious: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    Fraud: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
          <DocumentIcon />
        </div>
        <div>
          <div className="font-medium">{validation.name}</div>
          <div className="text-sm text-gray-600 dark:text-neutral-400">{validation.document}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-medium">{validation.confidence}%</div>
          <div className="text-xs text-gray-500 dark:text-neutral-500">{validation.timestamp}</div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[validation.status as keyof typeof statusColors]}`}>
          {validation.status}
        </span>
      </div>
    </div>
  )
}

function DocumentTypeItem({ type, percentage, count }: { type: string; percentage: number; count: number }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-gradient-to-r from-emerald-500 to-sky-500" />
        <span className="text-sm font-medium">{type}</span>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">{percentage}%</div>
        <div className="text-xs text-gray-500 dark:text-neutral-500">{count.toLocaleString()}</div>
      </div>
    </div>
  )
}

function HealthMetric({ label, value, status }: { label: string; value: string; status: 'good' | 'warning' | 'error' }) {
  const statusColors = {
    good: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <span className={`text-sm font-medium ${statusColors[status]}`}>{value}</span>
    </div>
  )
}

// Icons
const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
