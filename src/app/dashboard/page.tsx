"use client";
import { Users, MessageSquare, Calendar, AlertCircle, TrendingUp, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardStats, monthlyTrends } from "@/lib/data";

export default function DashboardHome() {
  const stats = dashboardStats;
  const cards = [
    { title: "Total Patients", value: stats.totalPatients, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Needs Follow-up", value: stats.needsFollowup, icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50" },
    { title: "Unread Messages", value: stats.unreadMessages, icon: MessageSquare, color: "text-red-500", bg: "bg-red-50" },
    { title: "Upcoming Appts", value: stats.upcomingAppointments, icon: Calendar, color: "text-green-500", bg: "bg-green-50" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div className={`p-3 rounded-md ${card.bg} mr-4`}><Icon className={`w-6 h-6 ${card.color}`} /></div>
              <div><p className="text-sm text-gray-500">{card.title}</p><p className="text-2xl font-bold text-gray-900">{card.value}</p></div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4"><TrendingUp className="w-5 h-5 text-brand-600 mr-2" /><h3 className="text-lg font-semibold text-gray-800">Follow-up Trends</h3></div>
          <div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={monthlyTrends}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" stroke="#9ca3af" fontSize={12} /><YAxis stroke="#9ca3af" fontSize={12} /><Tooltip /><Area type="monotone" dataKey="followups" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} /></AreaChart></ResponsiveContainer></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4"><Activity className="w-5 h-5 text-brand-600 mr-2" /><h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3></div>
          <ul className="space-y-4">
            <li className="flex items-start"><div className="w-2 h-2 mt-2 bg-green-500 rounded-full mr-3"></div><div><p className="text-sm font-medium text-gray-900">AI draft generated</p><p className="text-xs text-gray-500">10 mins ago</p></div></li>
            <li className="flex items-start"><div className="w-2 h-2 mt-2 bg-blue-500 rounded-full mr-3"></div><div><p className="text-sm font-medium text-gray-900">New patient registered</p><p className="text-xs text-gray-500">2 hrs ago</p></div></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
