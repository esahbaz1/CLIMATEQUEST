import React, { useState, useEffect } from 'react';
import { Users, Target, Trophy, TrendingUp, Globe, Leaf, Zap, Calendar, Check, Lock } from 'lucide-react';

const CommunityChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [activeTab, setActiveTab] = useState('global');

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      const challengesData = await window.storage.get('community-challenges', true);
      const userCommData = await window.storage.get('user-communities');

      if (challengesData) {
        setChallenges(JSON.parse(challengesData.value));
      } else {
        const defaultChallenges = [
          {
            id: 'global-emissions-1',
            title: 'Global Carbon Reduction Challenge',
            description: 'Join forces worldwide to collectively reduce carbon emissions by 5%',
            type: 'global',
            goal: 5,
            currentProgress: 2.3,
            participants: 15847,
            duration: '30 days',
            reward: '🌍 Global Hero Badge',
            icon: 'Globe',
            color: 'blue',
            startDate: '2025-11-01',
            endDate: '2025-11-30',
            status: 'active'
          },
          {
            id: 'school-energy-1',
            title: 'School Energy Savers',
            description: 'Schools compete to reduce energy consumption by 10%',
            type: 'school',
            goal: 10,
            currentProgress: 6.5,
            participants: 234,
            duration: '60 days',
            reward: '🏆 School Champion Trophy',
            icon: 'Zap',
            color: 'yellow',
            startDate: '2025-10-15',
            endDate: '2025-12-14',
            status: 'active'
          },
          {
            id: 'local-clean-1',
            title: 'Community Clean Energy Drive',
            description: 'Local communities transition to 50% renewable energy sources',
            type: 'community',
            goal: 50,
            currentProgress: 28,
            participants: 892,
            duration: '90 days',
            reward: '⚡ Clean Energy Pioneer',
            icon: 'Leaf',
            color: 'green',
            startDate: '2025-10-01',
            endDate: '2025-12-30',
            status: 'active'
          },
          {
            id: 'family-footprint-1',
            title: 'Family Carbon Footprint Challenge',
            description: 'Families work together to reduce their household carbon footprint by 15%',
            type: 'family',
            goal: 15,
            currentProgress: 11.2,
            participants: 3421,
            duration: '45 days',
            reward: '👨‍👩‍👧‍👦 Eco Family Award',
            icon: 'Users',
            color: 'purple',
            startDate: '2025-10-20',
            endDate: '2025-12-04',
            status: 'active'
          },
          {
            id: 'global-plastic-1',
            title: 'Plastic-Free Month',
            description: 'Global initiative to reduce single-use plastic consumption by 80%',
            type: 'global',
            goal: 80,
            currentProgress: 0,
            participants: 0,
            duration: '30 days',
            reward: '♻️ Plastic Warrior Badge',
            icon: 'Target',
            color: 'teal',
            startDate: '2025-12-01',
            endDate: '2025-12-31',
            status: 'upcoming'
          }
        ];
        await window.storage.set('community-challenges', JSON.stringify(defaultChallenges), true);
        setChallenges(defaultChallenges);
      }

      if (userCommData) {
        setUserCommunities(JSON.parse(userCommData.value));
      }
    } catch (error) {
      console.error('Storage error:', error);
      setChallenges([]);
      setUserCommunities([]);
    }
  };

  const getIcon = (iconName) => {
    const icons = { Users, Target, Trophy, TrendingUp, Globe, Leaf, Zap };
    const Icon = icons[iconName] || Target;
    return <Icon className="w-6 h-6" />;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      yellow: 'from-yellow-500 to-orange-500',
      green: 'from-green-500 to-emerald-600',
      purple: 'from-purple-500 to-pink-500',
      teal: 'from-teal-500 to-cyan-600'
    };
    return colors[color] || colors.blue;
  };

  const joinChallenge = async (challengeId) => {
    const updatedChallenges = challenges.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          participants: c.participants + 1,
          currentProgress: Math.min(c.currentProgress + (Math.random() * 0.5), c.goal)
        };
      }
      return c;
    });

    const newCommunity = {
      challengeId,
      joinedDate: new Date().toISOString(),
      personalContribution: 0
    };

    const updatedCommunities = [...userCommunities, newCommunity];

    try {
      await window.storage.set('community-challenges', JSON.stringify(updatedChallenges), true);
      await window.storage.set('user-communities', JSON.stringify(updatedCommunities));
      setChallenges(updatedChallenges);
      setUserCommunities(updatedCommunities);
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  const logProgress = async (challengeId, amount) => {
    const updatedChallenges = challenges.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          currentProgress: Math.min(c.currentProgress + amount, c.goal)
        };
      }
      return c;
    });

    const updatedCommunities = userCommunities.map(comm => {
      if (comm.challengeId === challengeId) {
        return {
          ...comm,
          personalContribution: (comm.personalContribution || 0) + amount
        };
      }
      return comm;
    });

    try {
      await window.storage.set('community-challenges', JSON.stringify(updatedChallenges), true);
      await window.storage.set('user-communities', JSON.stringify(updatedCommunities));
      setChallenges(updatedChallenges);
      setUserCommunities(updatedCommunities);
    } catch (error) {
      console.error('Error logging progress:', error);
    }
  };

  const isJoined = (challengeId) => {
    return userCommunities.some(c => c.challengeId === challengeId);
  };

  const getPersonalContribution = (challengeId) => {
    const community = userCommunities.find(c => c.challengeId === challengeId);
    return community?.personalContribution || 0;
  };

  const filteredChallenges = challenges.filter(c => {
    if (activeTab === 'global') return c.type === 'global';
    if (activeTab === 'joined') return isJoined(c.id);
    return c.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Community Challenges
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Join forces with others to create global environmental impact
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['global', 'school', 'community', 'family', 'joined'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredChallenges.map(challenge => (
            <div
              key={challenge.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Challenge Header */}
              <div className={`bg-gradient-to-r ${getColorClasses(challenge.color)} p-6 text-white`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur">
                      {getIcon(challenge.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{challenge.title}</h3>
                      <p className="text-white/80 text-sm">{challenge.type} challenge</p>
                    </div>
                  </div>
                  {challenge.status === 'upcoming' && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur">
                      <Lock className="w-3 h-3 inline mr-1" />
                      Upcoming
                    </span>
                  )}
                  {isJoined(challenge.id) && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur">
                      <Check className="w-3 h-3 inline mr-1" />
                      Joined
                    </span>
                  )}
                </div>
                <p className="text-white/90">{challenge.description}</p>
              </div>

              {/* Challenge Body */}
              <div className="p-6">
                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-bold text-gray-900">
                      {challenge.currentProgress.toFixed(1)}% / {challenge.goal}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getColorClasses(challenge.color)} transition-all duration-500 rounded-full`}
                      style={{ width: `${(challenge.currentProgress / challenge.goal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">Participants</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {challenge.participants.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">Duration</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{challenge.duration}</p>
                  </div>
                </div>

                {/* Reward */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-semibold text-gray-700">Reward:</span>
                    <span className="text-sm text-gray-900">{challenge.reward}</span>
                  </div>
                </div>

                {/* Personal Contribution */}
                {isJoined(challenge.id) && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Your Contribution:</span>
                      <span className="text-lg font-bold text-green-600">
                        {getPersonalContribution(challenge.id).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {!isJoined(challenge.id) && challenge.status === 'active' && (
                    <button
                      onClick={() => joinChallenge(challenge.id)}
                      className={`flex-1 bg-gradient-to-r ${getColorClasses(challenge.color)} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all`}
                    >
                      Join Challenge
                    </button>
                  )}
                  {isJoined(challenge.id) && (
                    <button
                      onClick={() => logProgress(challenge.id, Math.random() * 0.5)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Log Progress
                    </button>
                  )}
                  {challenge.status === 'upcoming' && (
                    <button
                      disabled
                      className="flex-1 bg-gray-300 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No challenges found in this category</p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">How It Works</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Join challenges that align with your environmental goals</li>
                <li>• Log your progress regularly to contribute to the collective goal</li>
                <li>• Track community progress in real-time and earn rewards</li>
                <li>• Invite friends and family to amplify your impact together</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChallenges;