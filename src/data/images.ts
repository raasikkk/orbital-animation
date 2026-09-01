const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export type Shot = {
  src: string
  alt: string
  caption: string
  index: string
  /** Direction the clip-path opens from. */
  reveal: 'up' | 'down' | 'left' | 'right' | 'center'
  aspect: string
}

export const gallery: Shot[] = [
  {
    src: unsplash('1446776877081-d282a0f896e2', 1800),
    alt: 'Cupola windows of an orbital station looking down at Earth',
    caption: 'Observation deck / Node 3',
    index: '01',
    reveal: 'up',
    aspect: '16 / 10',
  },
  {
    src: unsplash('1541873676-a18131494184', 1200),
    alt: 'Astronaut standing on the lunar surface',
    caption: 'Field unit — Mare Tranquillitatis',
    index: '02',
    reveal: 'left',
    aspect: '3 / 4',
  },
  {
    src: unsplash('1462331940025-496dfbfc7564', 1400),
    alt: 'The Bubble Nebula glowing in deep space',
    caption: 'Signal source NGC-7635',
    index: '03',
    reveal: 'center',
    aspect: '1 / 1',
  },
  {
    src: unsplash('1447433589675-4aaa569f3e05', 1600),
    alt: 'Cratered lunar surface photographed from low orbit',
    caption: 'Terrain scan / pass 4118',
    index: '04',
    reveal: 'right',
    aspect: '4 / 3',
  },
  {
    src: unsplash('1451187580459-43490279c0fa', 2000),
    alt: 'City lights of Earth at night seen from orbit',
    caption: 'Downlink window — nightside',
    index: '05',
    reveal: 'down',
    aspect: '21 / 9',
  },
  {
    src: unsplash('1608178398319-48f814d0750c', 1400),
    alt: 'The Orion Nebula in violet and magenta',
    caption: 'Deep field composite M-42',
    index: '06',
    reveal: 'up',
    aspect: '4 / 5',
  },
]

/** Grayscale-to-colour spotlight shot in the gallery. */
export const spotlightShot = {
  src: unsplash('1543722530-d2c3201371e7', 1800),
  alt: 'The Andromeda galaxy photographed against a dense star field',
  caption: 'ANDROMEDA / 2.537 MLY',
}

export const conceptPlates = [
  {
    src: unsplash('1516339901601-2e1b62dc0c45', 900),
    alt: 'Nebula and star cluster',
  },
  {
    src: unsplash('1614728263952-84ea256f9679', 900),
    alt: 'Space shuttle lifting off through cloud',
  },
  {
    src: unsplash('1564053489984-317bbd824340', 800),
    alt: 'Full disc of Earth from deep space',
  },
]

export const heroPlate = {
  src: unsplash('1502134249126-9f3755a50d78', 2000),
  alt: 'The Milky Way core across a night sky',
}
