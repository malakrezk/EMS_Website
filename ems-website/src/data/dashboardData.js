// Fake sample data used to power the interactive dashboard preview section

export const dashboardMetrics = [
  { id: 'voltage', label: 'Voltage', value: '132.4', unit: 'kV', status: 'nominal' },
  { id: 'current', label: 'Current', value: '3,684', unit: 'A', status: 'nominal' },
  { id: 'frequency', label: 'Frequency', value: '50.02', unit: 'Hz', status: 'nominal' },
  { id: 'active-power', label: 'Active Power', value: '842.6', unit: 'MW', status: 'nominal' },
  { id: 'reactive-power', label: 'Reactive Power', value: '118.3', unit: 'MVAR', status: 'nominal' }
]

export const dashboardAlarms = [
  { id: 1, level: 'critical', message: 'Feeder 12 overcurrent threshold exceeded', time: '08:42:11' },
  { id: 2, level: 'warning', message: 'Substation B transformer temp above baseline', time: '08:37:52' },
  { id: 3, level: 'info', message: 'Scheduled maintenance window starting on Bus 4', time: '08:15:04' },
  { id: 4, level: 'warning', message: 'Voltage dip detected on Feeder 07', time: '07:58:37' }
]

export const dashboardStatus = [
  { id: 'scada-core', label: 'SCADA Core', state: 'online' },
  { id: 'comms-link', label: 'Comms Link', state: 'online' },
  { id: 'historian', label: 'Historian', state: 'online' },
  { id: 'backup-control', label: 'Backup Control', state: 'standby' }
]

// Load curve data feeding the Recharts area chart, 24h in 3-hour increments
export const loadCurveData = [
  { time: '00:00', mw: 512 },
  { time: '03:00', mw: 468 },
  { time: '06:00', mw: 590 },
  { time: '09:00', mw: 742 },
  { time: '12:00', mw: 810 },
  { time: '15:00', mw: 866 },
  { time: '18:00', mw: 902 },
  { time: '21:00', mw: 704 },
  { time: '24:00', mw: 588 }
]

// Simplified node/edge map used to render a small illustrative grid map (not geographic)
export const gridMapNodes = [
  { id: 'A', x: 60, y: 60, label: 'Substation A', status: 'online' },
  { id: 'B', x: 200, y: 40, label: 'Substation B', status: 'online' },
  { id: 'C', x: 320, y: 100, label: 'Substation C', status: 'warning' },
  { id: 'D', x: 140, y: 160, label: 'Substation D', status: 'online' },
  { id: 'E', x: 280, y: 200, label: 'Substation E', status: 'online' }
]

export const gridMapEdges = [
  ['A', 'B'],
  ['B', 'C'],
  ['A', 'D'],
  ['D', 'E'],
  ['C', 'E']
]
