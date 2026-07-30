import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts';

/**
 * Radar Chart displaying section-wise score performance.
 */
export const ResumeRadarChart = ({ scores }) => {
  const data = [
    { subject: 'Summary', score: scores.summary || 0 },
    { subject: 'Skills', score: scores.skills || 0 },
    { subject: 'Projects', score: scores.projects || 0 },
    { subject: 'Experience', score: scores.experience || 0 },
    { subject: 'Education', score: scores.education || 0 },
    { subject: 'Formatting', score: scores.formatting || 0 },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#475569" strokeDasharray="3 3" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b' }} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#2563EB"
            fill="#3B82F6"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Vertical/Horizontal Bar Chart displaying section-wise score performance.
 */
export const SectionBarChartComp = ({ scores }) => {
  const data = [
    { name: 'Summary', Score: scores.summary || 0 },
    { name: 'Skills', Score: scores.skills || 0 },
    { name: 'Projects', Score: scores.projects || 0 },
    { name: 'Experience', Score: scores.experience || 0 },
    { name: 'Education', Score: scores.education || 0 },
    { name: 'Formatting', Score: scores.formatting || 0 },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgb(30, 41, 59)', border: 'none', borderRadius: '8px', color: '#fff' }}
            cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
          />
          <Bar dataKey="Score" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => {
              // Custom coloring depending on score
              let fill = '#EF4444'; // Red
              if (entry.Score >= 90) fill = '#10B981'; // Green
              else if (entry.Score >= 70) fill = '#F59E0B'; // Yellow
              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Pie Chart showing Strengths vs Weaknesses count.
 */
export const StrengthsWeaknessesPie = ({ strengthsCount, weaknessesCount }) => {
  const data = [
    { name: 'Strengths', value: strengthsCount },
    { name: 'Weaknesses', value: weaknessesCount },
  ];
  
  const COLORS = ['#10B981', '#EF4444'];

  return (
    <div className="w-full h-64 flex flex-col justify-center items-center">
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: 'rgb(30, 41, 59)', border: 'none', borderRadius: '8px', color: '#fff' }}
          />
          <Legend formatter={(value) => <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">{value}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Radial Bar Chart displaying simple visual distribution.
 */
export const SkillsDistributionChart = ({ technicalCount, softCount }) => {
  const data = [
    {
      name: 'Technical Skills',
      value: technicalCount,
      fill: '#2563EB',
    },
    {
      name: 'Soft Skills',
      value: softCount,
      fill: '#7C3AED',
    },
  ];

  return (
    <div className="w-full h-64 flex flex-col justify-center items-center">
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} layout="vertical" barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.1} />
          <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgb(30, 41, 59)', border: 'none', borderRadius: '8px', color: '#fff' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Semi-circular Gauge Chart representing overall ATS score.
 */
export const ATSGaugeChart = ({ score }) => {
  const data = [
    { name: 'Score', value: score, fill: score >= 90 ? '#10B981' : score >= 70 ? '#F59E0B' : '#EF4444' },
    { name: 'Remaining', value: 100 - score, fill: '#1e293b' },
  ];

  return (
    <div className="relative w-full h-48 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={90}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={data[0].fill} />
            <Cell fill="rgba(148, 163, 184, 0.1)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-2 flex flex-col items-center">
        <span className="text-4xl font-extrabold text-slate-800 dark:text-white">{score}</span>
        <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">ATS Score</span>
      </div>
    </div>
  );
};
