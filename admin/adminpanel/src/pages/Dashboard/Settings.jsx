import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './Settings.css'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [animationKey, setAnimationKey] = useState(0);
  const [offers, setOffers] = useState([
    { id: 1, title: 'Early Bird', discount: 20, validUntil: '2024-12-31', active: true },
    { id: 2, title: 'Student Discount', discount: 15, validUntil: '2024-12-25', active: true },
    { id: 3, title: 'Group Booking', discount: 25, validUntil: '2024-12-30', active: false }
  ]);
  const [ticketPricing, setTicketPricing] = useState([
    { id: 1, category: 'VIP', price: 150, capacity: 50, sold: 32 },
    { id: 2, category: 'Premium', price: 100, capacity: 200, sold: 156 },
    { id: 3, category: 'Standard', price: 50, capacity: 500, sold: 387 },
    { id: 4, category: 'Economy', price: 25, capacity: 800, sold: 623 }
  ]);
  const [newOffer, setNewOffer] = useState({ title: '', discount: '', validUntil: '' });
  const [newPricing, setNewPricing] = useState({ category: '', price: '', capacity: '' });

  // Trigger animation on tab change
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeTab]);

  // Dummy data for charts with greenish theme
  const revenueData = [
    { month: 'Jan', revenue: 12000, tickets: 240 },
    { month: 'Feb', revenue: 19000, tickets: 380 },
    { month: 'Mar', revenue: 15000, tickets: 300 },
    { month: 'Apr', revenue: 22000, tickets: 440 },
    { month: 'May', revenue: 28000, tickets: 560 },
    { month: 'Jun', revenue: 35000, tickets: 700 }
  ];

  const ticketDistribution = [
    { name: 'VIP', value: 32, color: '#059669' },
    { name: 'Premium', value: 156, color: '#10B981' },
    { name: 'Standard', value: 387, color: '#34D399' },
    { name: 'Economy', value: 623, color: '#6EE7B7' }
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalTickets = ticketPricing.reduce((sum, item) => sum + item.sold, 0);
  const totalCapacity = ticketPricing.reduce((sum, item) => sum + item.capacity, 0);

  const handleAddOffer = () => {
    if (newOffer.title && newOffer.discount && newOffer.validUntil) {
      setOffers([...offers, {
        id: Date.now(),
        title: newOffer.title,
        discount: parseInt(newOffer.discount),
        validUntil: newOffer.validUntil,
        active: true
      }]);
      setNewOffer({ title: '', discount: '', validUntil: '' });
    }
  };

  const handleAddPricing = () => {
    if (newPricing.category && newPricing.price && newPricing.capacity) {
      setTicketPricing([...ticketPricing, {
        id: Date.now(),
        category: newPricing.category,
        price: parseInt(newPricing.price),
        capacity: parseInt(newPricing.capacity),
        sold: 0
      }]);
      setNewPricing({ category: '', price: '', capacity: '' });
    }
  };

  const toggleOfferStatus = (id) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, active: !offer.active } : offer
    ));
  };

  const deleteOffer = (id) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  const updatePricing = (id, field, value) => {
    setTicketPricing(ticketPricing.map(item => 
      item.id === id ? { ...item, [field]: parseInt(value) || 0 } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-300 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-teal-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-green-300 rounded-full opacity-25 animate-bounce" style={{animationDelay: '3s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-ping" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-teal-400 rounded-full opacity-50 animate-ping" style={{animationDelay: '2.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 animate-bounce">
            <span className="text-5xl sm:text-6xl animate-pulse">🌿</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mx-3 animate-shimmer">
              Admin Dashboard
            </span>
            <span className="text-5xl sm:text-6xl animate-pulse">🌿</span>
          </h1>
          <p className="text-lg sm:text-xl text-green-800 font-semibold animate-fade-in-up">
            Manage your event operations with powerful insights
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-slide-in">
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'offers', label: '🎁 Offers', icon: '🎁' },
            { id: 'pricing', label: '💰 Pricing', icon: '💰' },
            { id: 'analytics', label: '📈 Analytics', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-110 hover:rotate-1 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-300 scale-105 animate-pulse'
                  : 'bg-white text-green-800 hover:bg-green-50 shadow-md hover:shadow-green-200'
              }`}
            >
              <span className="text-lg mr-2 animate-bounce">{tab.icon}</span>
              {tab.label.split(' ').slice(1).join(' ')}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in" key={`overview-${animationKey}`}>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-left">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 font-semibold">Total Revenue</p>
                    <p className="text-3xl font-bold animate-counter">${totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="text-4xl opacity-80 animate-bounce">💰</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-up" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 font-semibold">Tickets Sold</p>
                    <p className="text-3xl font-bold animate-counter">{totalTickets.toLocaleString()}</p>
                  </div>
                  <div className="text-4xl opacity-80 animate-bounce">🎫</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-down" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 font-semibold">Capacity Used</p>
                    <p className="text-3xl font-bold animate-counter">{((totalTickets/totalCapacity)*100).toFixed(1)}%</p>
                  </div>
                  <div className="text-4xl opacity-80 animate-bounce">📊</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 font-semibold">Active Offers</p>
                    <p className="text-3xl font-bold animate-counter">{offers.filter(o => o.active).length}</p>
                  </div>
                  <div className="text-4xl opacity-80 animate-bounce">🎁</div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-left">
                <h3 className="text-xl font-bold text-green-800 mb-4 animate-fade-in">📈 Revenue Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-right">
                <h3 className="text-xl font-bold text-green-800 mb-4 animate-fade-in">🎯 Ticket Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ticketDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {ticketDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div className="space-y-6 animate-fade-in" key={`offers-${animationKey}`}>
            <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-800 mb-6 animate-slide-in">🎁 Manage Offers</h3>
              
              {/* Add New Offer */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-green-50 rounded-xl animate-slide-in-up">
                <input
                  type="text"
                  placeholder="Offer Title"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                  className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="number"
                  placeholder="Discount %"
                  value={newOffer.discount}
                  onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                  className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="date"
                  value={newOffer.validUntil}
                  onChange={(e) => setNewOffer({...newOffer, validUntil: e.target.value})}
                  className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  onClick={handleAddOffer}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-semibold transform hover:scale-105 hover:rotate-1"
                >
                  ➕ Add Offer
                </button>
              </div>

              {/* Offers List */}
              <div className="space-y-4">
                {offers.map((offer, index) => (
                  <div 
                    key={offer.id} 
                    className="flex items-center justify-between p-4 bg-green-50 rounded-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-right"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full animate-pulse ${offer.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <h4 className="font-semibold text-green-800">{offer.title}</h4>
                        <p className="text-green-600">{offer.discount}% off • Valid until {offer.validUntil}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleOfferStatus(offer.id)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                          offer.active 
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {offer.active ? '⏸️ Pause' : '▶️ Activate'}
                      </button>
                      <button
                        onClick={() => deleteOffer(offer.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold transform hover:scale-105"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-6 animate-fade-in" key={`pricing-${animationKey}`}>
            <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-800 mb-6 animate-slide-in">💰 Ticket Pricing</h3>
              
              {/* Add New Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-green-50 rounded-xl animate-slide-in-up">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newPricing.category}
                  onChange={(e) => setNewPricing({...newPricing, category: e.target.value})}
                  className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={newPricing.price}
                  onChange={(e) => setNewPricing({...newPricing, price: e.target.value})}
                  className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={newPricing.capacity}
                  onChange={(e) => setNewPricing({...newPricing, capacity: e.target.value})}
                  className="px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  onClick={handleAddPricing}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-semibold transform hover:scale-105 hover:rotate-1"
                >
                  ➕ Add Category
                </button>
              </div>

              {/* Pricing Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-green-200">
                      <th className="text-left py-3 px-4 font-semibold text-green-700">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-green-700">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-green-700">Capacity</th>
                      <th className="text-left py-3 px-4 font-semibold text-green-700">Sold</th>
                      <th className="text-left py-3 px-4 font-semibold text-green-700">Remaining</th>
                      <th className="text-left py-3 px-4 font-semibold text-green-700">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketPricing.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className="border-b border-green-100 hover:bg-green-50 transition-all duration-300 animate-slide-in-right"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <td className="py-3 px-4 font-semibold text-green-800">{item.category}</td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => updatePricing(item.id, 'price', e.target.value)}
                            className="w-20 px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={item.capacity}
                            onChange={(e) => updatePricing(item.id, 'capacity', e.target.value)}
                            className="w-20 px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          />
                        </td>
                        <td className="py-3 px-4 text-green-600 font-semibold">{item.sold}</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">{item.capacity - item.sold}</td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-green-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 animate-pulse"
                              style={{ width: `${(item.sold / item.capacity) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-green-600 mt-1">
                            {((item.sold / item.capacity) * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in" key={`analytics-${animationKey}`}>
            <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-800 mb-6 animate-slide-in">📈 Sales Analytics</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10B981" />
                  <Bar dataKey="tickets" fill="#059669" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-left">
                <h4 className="text-lg font-bold text-green-800 mb-4">🎯 Top Performing Categories</h4>
                <div className="space-y-3">
                  {ticketPricing.sort((a, b) => b.sold - a.sold).map((item, index) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg transform hover:scale-105 transition-all duration-300 animate-slide-in-right"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold animate-pulse ${
                          index === 0 ? 'bg-green-500' : index === 1 ? 'bg-emerald-500' : index === 2 ? 'bg-teal-500' : 'bg-green-400'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-semibold text-green-800">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{item.sold} sold</div>
                        <div className="text-sm text-green-500">${(item.sold * item.price).toLocaleString()} revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-right">
                <h4 className="text-lg font-bold text-green-800 mb-4">📊 Key Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg transform hover:scale-105 transition-all duration-300 animate-slide-in-left">
                    <span className="text-green-700">Average Ticket Price</span>
                    <span className="font-bold text-green-600">
                      ${(ticketPricing.reduce((sum, item) => sum + (item.price * item.sold), 0) / totalTickets).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg transform hover:scale-105 transition-all duration-300 animate-slide-in-right">
                    <span className="text-green-700">Conversion Rate</span>
                    <span className="font-bold text-emerald-600">{((totalTickets / totalCapacity) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg transform hover:scale-105 transition-all duration-300 animate-slide-in-left">
                    <span className="text-green-700">Revenue per Capacity</span>
                    <span className="font-bold text-teal-600">${(totalRevenue / totalCapacity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}

export default AdminDashboard;