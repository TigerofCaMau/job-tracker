export const SORT_OPTIONS = {
  dateDesc: [
    { field: 'applicationDate', dir: -1, type: 'date' },
    { field: 'company', dir: 1, type: 'string' },
  ],
  dateAsc: [
    { field: 'applicationDate', dir: 1, type: 'date' },
    { field: 'company', dir: 1, type: 'string' },
  ],
  companyDesc: [
    { field: 'company', dir: -1, type: 'string' },
    { field: 'applicationDate', dir: -1, type: 'date' },
  ],
  companyAsc: [
    { field: 'company', dir: 1, type: 'string' },
    { field: 'applicationDate', dir: -1, type: 'date' },
  ],
  statusDesc: [
    { field: 'status', dir: -1, type: 'string' },
    { field: 'applicationDate', dir: -1, type: 'date' },
  ],
  statusAsc: [
    { field: 'status', dir: 1, type: 'string' },
    { field: 'applicationDate', dir: -1, type: 'date' },
  ],
};

/**
 * Generic comparison utility
 */
export const compareValues = (a, b, dir = 1, type = 'string') => {
  if (a == null) a = type === 'string' ? '' : Infinity;
  if (b == null) b = type === 'string' ? '' : Infinity;

  if (type === 'number' || type === 'date') {
    const na = Number(a);
    const nb = Number(b);
    return (na - nb) * dir;
  }

  if (type === 'string') {
    return a.toString().toLowerCase().localeCompare(b.toString().toLowerCase()) * dir;
  }

  return 0;
};

/**
 * Multi-level job sorting based on SORT_OPTIONS
 */
export const sortJobs = (jobs, sortOption) => {
  if (!Array.isArray(jobs) || jobs.length === 0) return [];

  const criteria = SORT_OPTIONS[sortOption];
  if (!criteria) return [...jobs];

  const jobsCopy = [...jobs];

  return jobsCopy.sort((a, b) => {
    for (const { field, dir, type } of criteria) {
      const aVal = type === 'date' ? a.__parsedDate ?? Infinity : a[field];
      const bVal = type === 'date' ? b.__parsedDate ?? Infinity : b[field];
      const cmp = compareValues(aVal, bVal, dir, type);
      if (cmp !== 0) return cmp;
    }

    // Stable fallback: use numeric ID if all criteria are equal
    const aid = a.id ? Number(a.id) || 0 : 0;
    const bid = b.id ? Number(b.id) || 0 : 0;
    return aid - bid;
  });
};