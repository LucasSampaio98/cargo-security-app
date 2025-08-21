import CargoForm from './components/CargoForm'
import CargoList from './components/CargoList'
import RiskDashboard from './components/RiskDashboard'
import AlertSystem from './components/AlertSystem'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">New cargo analysis</h2>
            <CargoForm />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Real-time alert</h2>
            <AlertSystem />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Most recent cargo</h2>
            <CargoList />
          </div>
        </div>

        <div className="lg:col-span-1">
          <RiskDashboard />
        </div>
      </div>
    </div>
  )
}