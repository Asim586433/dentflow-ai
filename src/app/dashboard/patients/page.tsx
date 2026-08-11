"use client";
import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import Image from "next/image";

interface Patient { id: string; name: string; email: string; phone: string; status: string; avatar: string; }

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      const res = await fetch(`/api/patients?search=${search}`);
      const data = await res.json();
      setPatients(data);
      setLoading(false);
    };
    const delayDebounceFn = setTimeout(fetchPatients, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patient Directory</h1>
        <button className="flex items-center bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700"><Plus className="w-4 h-4 mr-2" /> Add Patient</button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (<tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">Loading...</td></tr>) : patients.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><Image src={p.avatar} alt={p.name} width={40} height={40} className="rounded-full" /><div className="ml-4 text-sm font-medium text-gray-900">{p.name}</div></div></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.email}</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
