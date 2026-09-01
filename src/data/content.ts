export const stats = [
  { value: 128, suffix: '', label: 'Satellites deployed' },
  { value: 99.98, suffix: '%', label: 'Constellation uptime', decimals: 2 },
  { value: 42, suffix: 'ms', label: 'Latency to orbit' },
  { value: 7, suffix: '', label: 'Ground stations' },
]

export const capabilities = [
  {
    id: 'swarm',
    icon: 'Satellite',
    title: 'Autonomous Swarm',
    body: 'Two hundred nodes negotiate their own formation. No ground command, no lag, no single point of failure.',
    meta: 'MODULE 01',
  },
  {
    id: 'neural',
    icon: 'Cpu',
    title: 'Neural Guidance',
    body: 'On-board inference rewrites the burn plan mid-manoeuvre, sixty times a second, at four watts.',
    meta: 'MODULE 02',
  },
  {
    id: 'signal',
    icon: 'Radar',
    title: 'Deep Signal',
    body: 'Phased optical downlink pushes a terabit through atmosphere that should not allow it.',
    meta: 'MODULE 03',
  },
  {
    id: 'mechanics',
    icon: 'Orbit',
    title: 'Orbital Mechanics',
    body: 'Station-keeping solved as a continuous field problem instead of a queue of scheduled corrections.',
    meta: 'MODULE 04',
  },
  {
    id: 'sync',
    icon: 'Waves',
    title: 'Gravity Sync',
    body: 'A shared clock accurate to a picosecond keeps the whole constellation thinking as one instrument.',
    meta: 'MODULE 05',
  },
]

export const timeline = [
  {
    id: '01',
    title: 'Signal',
    body: 'A ground array listens for eleven months and finds a pattern nobody expected.',
    year: '2031',
  },
  {
    id: '02',
    title: 'Ascent',
    body: 'First stack leaves the pad. Ninety-four seconds of controlled violence.',
    year: '2032',
  },
  {
    id: '03',
    title: 'Insertion',
    body: 'Nodes unfold at 540 km and start talking to each other before we do.',
    year: '2033',
  },
  {
    id: '04',
    title: 'Swarm Sync',
    body: 'The constellation closes its own control loop. We stop flying it.',
    year: '2035',
  },
  {
    id: '05',
    title: 'Deep Field',
    body: 'The array turns outward and begins the survey it was actually built for.',
    year: '2038',
  },
]

export const tickerTop = [
  'AUTONOMY',
  'DEEP SPACE',
  'NEURAL GUIDANCE',
  'ZERO-G',
  'SIGNAL',
  'ORBITAL',
]

export const tickerBottom = [
  'NO GROUND CONTROL',
  'BUILT FOR VACUUM',
  '540 KM',
  'ALWAYS LISTENING',
  'MACHINES THAT DREAM',
]

export const conceptCopy =
  'We build autonomous intelligence for the hardest environment there is. Two hundred kilograms of hardware, a vacuum, and a machine that decides for itself where to point.'
