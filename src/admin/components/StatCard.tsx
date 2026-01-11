
import React from 'react';
import { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, isPositive, icon }) => {
  return (
    <div className="bg-surface border border-border-light rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg border border-border-light group-hover:bg-primary-subtle group-hover:border-primary-light transition-colors">
          <span className={`material-symbols-outlined ${isPositive ? 'text-primary' : 'text-text-muted'}`}>
            {icon}
          </span>
        </div>
        {trend && (
          <span className={`flex items-center text-sm font-bold px-2 py-0.5 rounded ${isPositive ? 'bg-primary-subtle text-primary' : 'bg-red-50 text-red-600'}`}>
            <span className="material-symbols-outlined text-[16px] mr-1">
              {isPositive ? 'trending_up' : 'trending_down'}
            </span>
            {trend}
          </span>
        )}
      </div>
      <p className="text-text-muted text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-black text-text-main tracking-tight">{value}</h3>
    </div>
  );
};

export default StatCard;
