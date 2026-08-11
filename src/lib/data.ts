export interface Patient { id: string; name: string; email: string; phone: string; status: 'ACTIVE' | 'NEEDS_FOLLOWUP' | 'INACTIVE'; lastVisit: string; avatar: string; }
export const mockPatients: Patient[] = Array.from({ length: 25 }).map((_, i) => {
  const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis", "Diana Prince", "Evan Wright", "Fiona Gallagher"];
  const statuses = ['ACTIVE', 'NEEDS_FOLLOWUP', 'INACTIVE'];
  const name = names[i % names.length] + ` ${i+1}`;
  return {
    id: `p_${i + 1}`, name, email: `${name.toLowerCase().replace(/ /g, '.')}@example.com`,
    phone: `555-010${i+1}`, status: statuses[i % 3], lastVisit: `2024-0${(i % 9) + 1}-1${i % 9}`,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
  };
});
export const dashboardStats = { totalPatients: 1245, needsFollowup: 14, unreadMessages: 7, upcomingAppointments: 22 };
export const monthlyTrends = [ { name: "Jan", followups: 45 }, { name: "Feb", followups: 52 }, { name: "Mar", followups: 48 }, { name: "Apr", followups: 61 }, { name: "May", followups: 55 }, { name: "Jun", followups: 67 } ];
