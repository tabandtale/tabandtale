const assets = '/templates/our-little-universe'

export interface UniverseMemory {
  id: string
  title: string
  date: string
  place: string
  story: string
  image: string
  x: string
  y: string
  color: 'green' | 'blue' | 'yellow' | 'lilac' | 'mint' | 'sky'
}

export interface UniverseEvidence {
  label: string
  caption: string
  image: string
  alt: string
}

export interface UniverseAward {
  id: string
  title: string
  citation: string
  extra: string
}

export interface UniverseData {
  names: string
  kicker: string
  heading: string
  lede: string
  mapNote: string
  memories: UniverseMemory[]
  evidenceIntro: string
  evidence: UniverseEvidence[]
  awards: UniverseAward[]
  pickYouBody: string
  audioTitle: string
  audioSender: string
  audioCaption: string
  audioSrc?: string
  closingLine: string
  closingNote: string
  secret: string
  closingPhotos: { src: string; alt: string; caption: string }[]
}

export const universeData: UniverseData = {
  names: 'Rio & Sage',
  kicker: 'A very unofficial documentation of us',
  heading: 'Our little universe.',
  lede: 'A collection of questionable decisions, elite memories, and the person who somehow makes all of it make sense.',
  mapNote: 'Field notes, approximately.',
  memories: [
    {
      id: 'hello',
      title: 'The first hello',
      date: 'A Tuesday, allegedly',
      place: 'Somewhere ordinary',
      story: 'Neither of us knew what we were getting ourselves into.',
      image: `${assets}/memory-hello.jpg`,
      x: '12%',
      y: '28%',
      color: 'green',
    },
    {
      id: 'decision',
      title: 'The questionable decision',
      date: 'Later that year',
      place: 'A plan with no plan',
      story: 'It seemed like a good idea at the time. It absolutely was not.',
      image: `${assets}/memory-decision.jpg`,
      x: '32%',
      y: '18%',
      color: 'yellow',
    },
    {
      id: 'food',
      title: 'The food adventure',
      date: 'One long afternoon',
      place: 'Wherever the snacks were',
      story: 'We went for one thing and somehow made an entire day out of it.',
      image: `${assets}/evidence-food.jpg`,
      x: '54%',
      y: '34%',
      color: 'blue',
    },
    {
      id: 'laugh',
      title: 'The unnecessary laughing',
      date: 'Most days, actually',
      place: 'Public, unfortunately',
      story: "Nobody else understood what was funny. We still don't.",
      image: `${assets}/evidence-laugh.jpg`,
      x: '72%',
      y: '22%',
      color: 'lilac',
    },
    {
      id: 'core',
      title: 'The core memory',
      date: 'Filed under: keep',
      place: 'The good light',
      story: 'One of those days you wish you could replay.',
      image: `${assets}/memory-core.jpg`,
      x: '48%',
      y: '62%',
      color: 'mint',
    },
    {
      id: 'next',
      title: 'The next adventure',
      date: 'Not yet',
      place: 'TBD, obviously',
      story: 'Still waiting to happen.',
      image: `${assets}/close-1.jpg`,
      x: '78%',
      y: '68%',
      color: 'sky',
    },
  ],
  evidenceIntro: 'Definitely not the photos we said we would delete.',
  evidence: [
    {
      label: 'Outside, together, somehow',
      caption: 'An ordinary day that somehow became a whole story.',
      image: `${assets}/evidence-outside.jpg`,
      alt: 'Friends together outdoors',
    },
    {
      label: 'The food was a side quest',
      caption: 'We went out for food and returned with approximately seventeen other memories.',
      image: `${assets}/evidence-food.jpg`,
      alt: 'A shared table and too many plates',
    },
    {
      label: 'Laughing at our own jokes',
      caption: 'Nobody else needed to understand. We were having a great time.',
      image: `${assets}/evidence-laugh.jpg`,
      alt: 'Friends mid-laugh',
    },
  ],
  awards: [
    {
      id: 'podcaster',
      title: 'The voice note podcaster',
      citation: 'For sending a 7-minute audio that could have been one sentence.',
      extra: 'Exhibit A: the one that started with “wait wait wait” and ended with a grocery list, a conspiracy, and a compliment.',
    },
    {
      id: 'chaos',
      title: 'Chaos Coordinator',
      citation: 'For making every plan more interesting than it needed to be.',
      extra: 'We were supposed to be gone twenty minutes. The universe disagreed. You coordinated the disagreement.',
    },
    {
      id: 'clown',
      title: 'Emotional support clown',
      citation: 'For making me laugh exactly when I needed it.',
      extra: 'Not the polished kind of funny. The exact-right-stupid-joke-at-the-exact-right-time kind.',
    },
  ],
  pickYouBody: "Even when you steal my fries, send the most chaotic voice notes, or say 'quick question' and change my entire afternoon.",
  audioTitle: 'In case you forgot',
  audioSender: 'From Sage, unofficially',
  audioCaption: 'A voice note that could have been a text. It was not.',
  closingLine: 'Here is to all the memories we have not made yet.',
  closingNote: 'for Rio & Sage, filed under forever-ish',
  secret: 'P.S. The research is inconclusive. We are keeping you anyway.',
  closingPhotos: [
    { src: `${assets}/close-1.jpg`, alt: 'Friends in a bright room', caption: 'same stars' },
    { src: `${assets}/close-2.jpg`, alt: 'A group in the middle of a good story', caption: 'new stories' },
  ],
}
