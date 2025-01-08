'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,ReferenceLine  } from 'recharts';
import { BarChart, Layout, Award, Menu, X, Trophy, FileText, CheckCircle, User } from 'lucide-react';
import Image from 'next/image';
import SidebarLink from '@/components/SidebarLink'

export default function SkillDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    rank: '1',
    percentile: '30',
    currentScore: '10'
  });

  const [errors, setErrors] = useState({
    rank: '',
    percentile: '',
    currentScore: ''
  });

  const distributionData = Array.from({ length: 20 }, (_, i) => ({
    percentile: i * 5,
    frequency: Math.exp(-(Math.pow(i * 5 - 72, 2) / 500)) * 100
  }));

  const syllabusData = [
    { topic: "HTML Tools, Forms, History", score: 80 },
    { topic: "Tags & References in HTML", score: 60 },
    { topic: "Tables & References in HTML", score: 24 },
    { topic: "Tables & CSS Bascis", score: 96 }
  ];

  const validateField = (name, value) => {
    let error = '';
    const numValue = parseInt(value);

    switch (name) {
      case 'rank':
        if (value === '' || isNaN(numValue)) {
          error = 'Rank is required';
        } else if (numValue <= 0) {
          error = 'Rank must be greater than 0';
        }
        break;
      case 'percentile':
        if (value === '' || isNaN(numValue)) {
          error = 'Percentile is required';
        } else if (numValue < 1 || numValue > 100) {
          error = 'Percentile must be between 1 and 100';
        }
        break;
      case 'currentScore':
        if (value === '' || isNaN(numValue)) {
          error = 'Score is required';
        } else if (numValue < 0 || numValue > 15) {
          error = 'Score must be between 0 and 15';
        }
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {
      rank: validateField('rank', formData.rank),
      percentile: validateField('percentile', formData.percentile),
      currentScore: validateField('currentScore', formData.currentScore)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex justify-between items-center px-4 md:px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Image src="/logo.png" alt="WhatBytes" width={200} height={100} />
          </div>
          <div className="flex items-center gap-2">
            <User className="w-8 h-8 rounded-full" />
            <span className="font-medium hidden sm:inline">Rahil Siddique</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <div className={`
          lg:hidden fixed inset-0 z-20 transition-transform duration-200
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute top-0 left-0 w-64 h-full bg-white">
            <div className="py-4">
              <SidebarLink icon={BarChart} text="Dashboard" active={false} />
              <SidebarLink icon={Award} text="Skill Test" active={true} />
              <SidebarLink icon={Layout} text="Internship" active={false} />
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-64 bg-white border-r flex-shrink-0">
          <div className="py-4">
            <SidebarLink icon={BarChart} text="Dashboard" active={false} />
            <SidebarLink icon={Award} text="Skill Test" active={true} />
            <SidebarLink icon={Layout} text="Internship" active={false} />
          </div>
        </div>
        <div className="flex-1 bg-gray-50 min-h-screen">
          <div className="p-4 md:p-6">
            <h1 className="text-xl text-gray-800 font-bold mb-6">Skill Test</h1>
            
            <div className="grid lg:grid-cols-[1fr,320px] gap-6">
              <div>
                <div className="bg-white rounded-lg border mb-6">
                  <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Image src="/htmllogo.png" alt="HTML5" width={48} height={45} />
                      <div>
                        <h2 className="text-lg font-medium">Hyper Text Markup Language</h2>
                        <p className="text-gray-500 text-sm">Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="px-6 py-2 bg-violet-800 text-white rounded hover:bg-violet-900 w-full sm:w-auto"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg border mb-6">
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold mb-4">Quick Statistics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-xl font-bold">{formData.rank}</p>
                          <p className="text-gray-500 text-sm mt-0.5">YOUR RANK</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xl font-bold">{formData.percentile}%</p>
                          <p className="text-gray-500 text-sm mt-0.5">PERCENTILE</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <p className="text-xl font-bold">{formData.currentScore}/15</p>
                          <p className="text-gray-500 text-sm mt-0.5">CORRECT ANSWERS</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border">
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold mb-2">Comparison Graph</h3>
                    <p className="text-gray-600 mb-6">
                      You scored {formData.percentile}% percentile which is lower than the average percentile 72% 
                      of all the engineers who took this assessment
                    </p>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={distributionData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorFrequency" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="#eee" 
                            vertical={false}
                          />
                          <XAxis 
                            dataKey="percentile" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666' }}
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                          />
                          <YAxis 
                            hide={true}
                          />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white p-3 border rounded shadow">
                                    <p className="text-lg font-semibold">{payload[0].payload.percentile}</p>
                                    <p className="text-sm text-violet-600">
                                      numberOfStudent: {Math.round(payload[0].value / 10)}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <ReferenceLine
                            x={parseInt(formData.percentile)}
                            stroke="#666"
                            strokeDasharray="3 3"
                            label={
                              <text
                                x={200}
                                y={150}
                                textAnchor="middle"
                                fill="#666"
                                fontSize={12}
                              >
                                your percentile
                              </text>
                            }
                          />
                          <Area
                            type="monotone"
                            dataKey="frequency"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorFrequency)"
                            dot={{
                              stroke: '#8884d8',
                              strokeWidth: 2,
                              r: 3,
                              fill: 'white'
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg border p-4 md:p-5">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Syllabus Wise Analysis</h3>
                    <span className="text-blue-600 font-medium">{formData.currentScore}/15</span>
                  </div>
                  <div className="space-y-6">
                    {syllabusData.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">{item.topic}</span>
                          <span className="text-gray-600">{item.score}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${item.score}%`,
                              backgroundColor: 
                                item.score >= 80 ? '#3B82F6' : 
                                item.score >= 60 ? '#F97316' : 
                                '#EF4444'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg border p-4 md:p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Question Analysis</h3>
                    <span className="text-blue-600 font-medium">{formData.currentScore}/15</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    You scored {formData.currentScore} question correct out of 15. However it still needs some improvements
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="#EEF2FF"
                          strokeWidth="16"
                          fill="none"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="#3B82F6"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray={`${(parseInt(formData.currentScore)/15) * 2 * Math.PI * 88} ${2 * Math.PI * 88}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8">
                        <div className="w-8 h-8 flex justify-center -translate-y-4">
                          <span className='text-6xl'>🎯</span>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-[90%] max-w-[600px]">
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/htmllogo.png" alt="HTML5" height={32} width={32} />
                <h2 className="text-xl font-semibold">Update scores</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className='flex flex-col sm:flex-row gap-3 sm:justify-between'>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm">1</div>
                      <label className="font-medium">Update your Rank</label>
                    </div>
                    <div className="w-full sm:w-[40%]">
                      <input
                        type="number"
                        name="rank"
                        value={formData.rank}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          errors.rank ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.rank && (
                        <p className="text-red-500 text-sm mt-1">{errors.rank}</p>
                      )}
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-3 sm:justify-between'>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm">2</div>
                      <label className="font-medium">Update your Percentile</label>
                    </div>
                    <div className="w-full sm:w-[40%]">
                      <input
                        type="number"
                        name="percentile"
                        value={formData.percentile}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          errors.percentile ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.percentile && (
                        <p className="text-red-500 text-sm mt-1">{errors.percentile}</p>
                      )}
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-3 sm:justify-between'>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm">3</div>
                      <label className="font-medium">Update your Current Score (out of 15)</label>
                    </div>
                    <div className="w-full sm:w-[40%]">
                      <input
                        type="number"
                        name="currentScore"
                        value={formData.currentScore}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          errors.currentScore ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.currentScore && (
                        <p className="text-red-500 text-sm mt-1">{errors.currentScore}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-800 flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    Save
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}