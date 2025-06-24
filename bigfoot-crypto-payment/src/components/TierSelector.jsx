import React from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { TIERS } from '../utils/constants';
import { isValidAmount } from '../utils/helpers';

const TierSelector = () => {
  const { 
    customAmount, 
    setAmount, 
    setCustomAmount, 
    nextStep 
  } = usePaymentStore();

  const handleTierSelect = (amount) => {
    setAmount(amount);
    nextStep();
  };

  const handleCustomAmount = () => {
    if (isValidAmount(customAmount)) {
      setAmount(Number(customAmount));
      nextStep();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3">

      {/* Pierwszy rząd - Student i Tourist */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {TIERS.slice(0, 2).map((tier) => (
          <TierCard 
            key={tier.name}
            tier={tier}
            onClick={() => handleTierSelect(tier.amount)}
          />
        ))}
      </div>

      {/* Drugi rząd - Scout i Ranger */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {TIERS.slice(2, 4).map((tier) => (
          <TierCard 
            key={tier.name}
            tier={tier}
            onClick={() => handleTierSelect(tier.amount)}
          />
        ))}
      </div>

      {/* Trzeci rząd - Szeryf na pełną szerokość */}
      <div className="mb-4">
        <TierCard 
          tier={TIERS[4]}
          onClick={() => handleTierSelect(TIERS[4].amount)}
          fullWidth
        />
      </div>

      {/* Custom Amount */}
      <CustomAmountSelector 
        value={customAmount}
        onChange={setCustomAmount}
        onSubmit={handleCustomAmount}
      />
    </div>
  );
};

const TierCard = ({ tier, onClick, fullWidth = false }) => (
  <button
    onClick={onClick}
    className={`${fullWidth ? 'w-full' : ''} relative overflow-hidden backdrop-blur-sm bg-gradient-to-br ${tier.color} border border-white/50 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group`}
  >
    {fullWidth ? (
      <div className="flex items-center justify-center space-x-4">
        <div className="text-3xl">{tier.icon}</div>
        <div>
          <h3 className="text-lg font-bold">{tier.name}</h3>
          <div className="text-2xl font-bold">{tier.amount} PLN</div>
        </div>
      </div>
    ) : (
      <>
        <div className="text-3xl mb-2">{tier.icon}</div>
        <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
        <div className="text-2xl font-bold">{tier.amount} PLN</div>
      </>
    )}
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
  </button>
);

const CustomAmountSelector = ({ value, onChange, onSubmit }) => (
  <div className="backdrop-blur-sm bg-white/50 border border-gray-200/50 p-4 rounded-2xl max-w-md mx-auto shadow-lg">
    <h3 className="text-l font-bold mb-2 text-center text-gray-800">Własna kwota</h3>
    <div className="space-y-3">
      <input
        type="number"
        placeholder="PLN"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 backdrop-blur-sm bg-white/70 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-gray-300/50 text-lg text-center"
      />
      <button
        onClick={onSubmit}
        disabled={!isValidAmount(value)}
        className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white py-3 px-8 rounded-xl hover:from-blue-600/80 hover:to-indigo-700/80 disabled:from-gray-400/80 disabled:to-gray-500/80 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg"
      >
        Dalej
      </button>
    </div>
  </div>
);

export default TierSelector;