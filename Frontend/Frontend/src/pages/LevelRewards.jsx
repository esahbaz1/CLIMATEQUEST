import React, { useState } from 'react';
import { Trophy, Award, Star, Leaf, Zap, Target, TrendingUp, Shield } from 'lucide-react';
import '../styles/LevelRewards.css';

const LevelsRewards = () => {
  const [userStats] = useState({
    xp: 3250,
    level: 5,
    co2Reduction: 82,
    missionsCompleted: 12,
    totalMissions: 20
  });

  const [badges] = useState([
    {
      id: 1,
      name: 'Eco Innovator',
      description: 'Achieved 80% CO₂ reduction',
      icon: 'leaf',
      earned: true,
      earnedDate: '2025-11-05',
      rarity: 'legendary',
      xpReward: 500
    },
    {
      id: 2,
      name: 'City Saver',
      description: 'Completed 10 missions successfully',
      icon: 'shield',
      earned: true,
      earnedDate: '2025-11-03',
      rarity: 'epic',
      xpReward: 300
    },
    {
      id: 3,
      name: 'Green Leader',
      description: 'Led 5 sustainability initiatives',
      icon: 'trophy',
      earned: true,
      earnedDate: '2025-11-01',
      rarity: 'rare',
      xpReward: 200
    },
    {
      id: 4,
      name: 'Energy Master',
      description: 'Optimized energy usage by 70%',
      icon: 'zap',
      earned: false,
      rarity: 'epic',
      xpReward: 350
    },
    {
      id: 5,
      name: 'Sustainability Pioneer',
      description: 'Complete all 20 missions',
      icon: 'target',
      earned: false,
      rarity: 'legendary',
      xpReward: 1000
    },
    {
      id: 6,
      name: 'Rising Star',
      description: 'Reach level 10',
      icon: 'star',
      earned: false,
      rarity: 'rare',
      xpReward: 250
    }
  ]);

  const [levels] = useState([
    { level: 1, xpRequired: 0, title: 'Beginner' },
    { level: 2, xpRequired: 500, title: 'Learner' },
    { level: 3, xpRequired: 1000, title: 'Contributor' },
    { level: 4, xpRequired: 2000, title: 'Activist' },
    { level: 5, xpRequired: 3000, title: 'Innovator' },
    { level: 6, xpRequired: 4500, title: 'Leader' },
    { level: 7, xpRequired: 6500, title: 'Expert' },
    { level: 8, xpRequired: 9000, title: 'Master' },
    { level: 9, xpRequired: 12000, title: 'Champion' },
    { level: 10, xpRequired: 16000, title: 'Legend' }
  ]);

  const getIconComponent = (iconName) => {
    const icons = {
      leaf: Leaf,
      shield: Shield,
      trophy: Trophy,
      zap: Zap,
      target: Target,
      star: Star
    };
    return icons[iconName] || Award;
  };

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'bg-gray-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-yellow-500'
    };
    return colors[rarity] || 'bg-gray-500';
  };

  const getRarityBorder = (rarity) => {
    const borders = {
      common: 'border-gray-400',
      rare: 'border-blue-400',
      epic: 'border-purple-400',
      legendary: 'border-yellow-400'
    };
    return borders[rarity] || 'border-gray-400';
  };

  const getCurrentLevel = () => {
    return levels.find(l => l.level === userStats.level) || levels[0];
  };

  const getNextLevel = () => {
    return levels.find(l => l.level === userStats.level + 1);
  };

  const getProgressToNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    if (!nextLevel) return 100;
    
    const xpInCurrentLevel = userStats.xp - currentLevel.xpRequired;
    const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired;
    return (xpInCurrentLevel / xpNeededForNext) * 100;
  };

  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏆 Your Achievements
          </h1>
          <p className="text-gray-600">Track your progress and unlock rewards</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Level {userStats.level}: {getCurrentLevel().title}
              </h2>
              <p className="text-gray-600">
                {userStats.xp.toLocaleString()} XP
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {getNextLevel() && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress to Level {userStats.level + 1}</span>
                <span>{Math.round(getProgressToNextLevel())}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${getProgressToNextLevel()}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {getNextLevel().xpRequired - userStats.xp} XP to next level
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">CO₂ Reduction</p>
              <p className="text-2xl font-bold text-green-600">
                {userStats.co2Reduction}%
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Missions</p>
              <p className="text-2xl font-bold text-blue-600">
                {userStats.missionsCompleted}/{userStats.totalMissions}
              </p>
            </div>
          </div>
        </div>

        {userStats.co2Reduction >= 80 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 mb-8 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">New Badge Earned!</h3>
                <p className="text-white/90">
                  You achieved an {userStats.co2Reduction}% CO₂ reduction — Badge earned: Eco Innovator
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Earned Badges ({earnedBadges.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map(badge => {
              const IconComponent = getIconComponent(badge.icon);
              return (
                <div 
                  key={badge.id}
                  className={`bg-white rounded-xl shadow-lg p-6 border-2 ${getRarityBorder(badge.rarity)} transform hover:scale-105 transition-transform`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${getRarityColor(badge.rarity)} rounded-full p-3`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{badge.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>+{badge.xpReward} XP</span>
                        <span>{badge.earnedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Locked Badges ({lockedBadges.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedBadges.map(badge => {
              const IconComponent = getIconComponent(badge.icon);
              return (
                <div 
                  key={badge.id}
                  className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-300 opacity-60"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-400 rounded-full p-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{badge.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>+{badge.xpReward} XP</span>
                        <span className="text-orange-500 font-semibold">🔒 Locked</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Level Milestones</h2>
          <div className="space-y-3">
            {levels.map((level) => (
              <div 
                key={level.level}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  userStats.level >= level.level 
                    ? 'bg-green-50 border-2 border-green-300' 
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    userStats.level >= level.level 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {level.level}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{level.title}</p>
                    <p className="text-sm text-gray-600">{level.xpRequired.toLocaleString()} XP</p>
                  </div>
                </div>
                {userStats.level >= level.level && (
                  <div className="text-green-500">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelsRewards;
