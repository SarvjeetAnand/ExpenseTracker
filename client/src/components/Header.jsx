import {  
  Calendar, 
  Wallet,
} from 'lucide-react';

const Header = () => (
  <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative container mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              BudgetWise
            </h1>
            <p className="text-blue-100 text-sm">Smart financial management</p>
          </div>
        </div>
        <div className="md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;