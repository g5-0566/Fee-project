import { useState } from 'react';
import { Plus, Edit2, Trash2, Building2, MapPin, Clock, X, CheckCircle2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { useQueue } from '../../context/QueueContext.jsx';
import { CATEGORIES } from '../../data/mockData.js';

/**
 * Admin Organisation Management Page
 * CRUD controls: Add, Edit, Delete organisations with immediate state update
 */
export function AdminOrganisations() {
  const { organisations, addOrganisation, updateOrganisation, deleteOrganisation } = useQueue();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Hospital',
    location: '',
    address: '',
    phone: '',
    averageServiceTime: 6,
    activeCounters: 2,
    services: 'General Consultation, Inquiries'
  });

  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingOrg(null);
    setFormData({
      name: '',
      category: 'Hospital',
      location: '',
      address: '',
      phone: '',
      averageServiceTime: 6,
      activeCounters: 2,
      services: 'General Consultation, Inquiries'
    });
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (org) => {
    setEditingOrg(org);
    setFormData({
      name: org.name,
      category: org.category,
      location: org.location,
      address: org.address || '',
      phone: org.phone || '',
      averageServiceTime: org.averageServiceTime,
      activeCounters: org.activeCounters,
      services: org.services ? org.services.join(', ') : ''
    });
    setFormError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingOrg(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim()) {
      setFormError('Please enter organisation name and city location.');
      return;
    }

    const servicesArray = formData.services
      ? formData.services.split(',').map((s) => s.trim()).filter(Boolean)
      : ['General Service'];

    if (editingOrg) {
      updateOrganisation(editingOrg.id, {
        name: formData.name.trim(),
        category: formData.category,
        location: formData.location.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        averageServiceTime: Number(formData.averageServiceTime) || 5,
        activeCounters: Number(formData.activeCounters) || 1,
        services: servicesArray
      });
    } else {
      addOrganisation({
        name: formData.name.trim(),
        category: formData.category,
        location: formData.location.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        averageServiceTime: Number(formData.averageServiceTime) || 5,
        activeCounters: Number(formData.activeCounters) || 1,
        services: servicesArray
      });
    }

    closeModal();
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to remove "${name}" from the system?`)) {
      deleteOrganisation(id);
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar type="admin" />

      <main className="dashboard-content" role="region" aria-label="Admin Organisation Directory">
        <div className="flex justify-between items-center flex-wrap gap-3" style={{ marginBottom: '1.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Manage Facilities & Desks
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Add, update and configure service locations across all categories
            </p>
          </div>

          <Button variant="primary" onClick={openAddModal} icon={Plus}>
            Add New Organisation
          </Button>
        </div>

        {/* Organisations List Table */}
        <div className="card" style={{ padding: '1rem' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Organisation</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Avg Service Time</th>
                  <th>Active Counters</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {organisations.map((org) => (
                  <tr key={org.id}>
                    <td>
                      <strong style={{ color: 'var(--text-primary)' }}>{org.name}</strong>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{org.category}</span>
                    </td>
                    <td>
                      <span className="flex items-center gap-1" style={{ fontSize: '0.88rem' }}>
                        <MapPin size={13} color="var(--primary)" /> {org.location}
                      </span>
                    </td>
                    <td>{org.averageServiceTime} mins</td>
                    <td style={{ fontWeight: 700 }}>{org.activeCounters}</td>
                    <td>
                      <StatusBadge status={org.statusInfo} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(org)}
                          className="btn btn-secondary btn-sm"
                          aria-label={`Edit ${org.name}`}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(org.id, org.name)}
                          className="btn btn-secondary btn-sm"
                          style={{ color: 'var(--danger)' }}
                          aria-label={`Delete ${org.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {modalOpen && (
          <div
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h3 id="modal-title" className="modal-title">
                  {editingOrg ? 'Edit Facility Details' : 'Register New Organisation'}
                </h3>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {formError && (
                <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <Input
                  id="org-name"
                  label="Organisation Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Metro Multispeciality Hospital"
                  required
                  autoFocus
                />

                <div className="form-group">
                  <label htmlFor="org-category" className="form-label">
                    Department Category
                  </label>
                  <select
                    id="org-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  id="org-location"
                  label="City / District"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Downtown Central, Ward 4"
                  required
                />

                <Input
                  id="org-address"
                  label="Full Street Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. 102 Healthcare Avenue, Medical District"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="org-avg-time"
                    label="Avg Time (Minutes)"
                    type="number"
                    min="1"
                    max="60"
                    value={formData.averageServiceTime}
                    onChange={(e) => setFormData({ ...formData, averageServiceTime: e.target.value })}
                    required
                  />

                  <Input
                    id="org-counters"
                    label="Active Counters"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.activeCounters}
                    onChange={(e) => setFormData({ ...formData, activeCounters: e.target.value })}
                    required
                  />
                </div>

                <Input
                  id="org-services"
                  label="Services Offered (Comma-separated)"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  placeholder="e.g. Blood Test, X-Ray, Consultation"
                  helperText="Separate multiple services with commas"
                />

                <div className="flex justify-end gap-2" style={{ marginTop: '1.5rem' }}>
                  <Button variant="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    {editingOrg ? 'Save Updates' : 'Add Facility'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminOrganisations;
