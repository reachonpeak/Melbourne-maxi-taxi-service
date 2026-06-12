'use client';
import { useState, useMemo } from 'react';
import { useLeads } from '@/hooks/useAdminData';
import LeadsFilter from '@/components/admin/LeadsFilter';
import LeadsTable from '@/components/admin/LeadsTable';
import LeadDetailModal from '@/components/admin/LeadDetailModal';
import { LeadsSkeleton } from '@/components/admin/AdminSkeleton';

export default function LeadsPage() {
  const { leads, loading, error, updateStatus } = useLeads();
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter && l.status !== statusFilter) return false;
      if (typeFilter && l.type !== typeFilter) return false;
      return true;
    });
  }, [leads, statusFilter, typeFilter]);

  const handleStatusChange = async (id, status) => {
    await updateStatus(id, status);
    // Update the selected lead in the modal too
    setSelectedLead((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  if (loading) return <LeadsSkeleton />;
  if (error) return <div className="admin-page-error">Error: {error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Leads</h1>
        <span className="admin-lead-count">{filtered.length} of {leads.length}</span>
      </div>

      <LeadsFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <LeadsTable leads={filtered} onSelect={setSelectedLead} />

      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
