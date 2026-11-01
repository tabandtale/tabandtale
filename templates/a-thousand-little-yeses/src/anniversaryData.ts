const assets = '/templates/a-thousand-little-yeses'

export interface AnniversaryPhoto {
  src: string
  alt: string
  caption: string
}

export interface AnniversaryScene {
  label: string
  title: string
  text: string
  image: string
}

export interface AnniversaryLetter {
  id: string
  number: string
  title: string
  teaser: string
  reminder: string
  body: string
  image: string
  annotation: string
}

export interface AnniversaryChapter {
  label: string
  date: string
  title: string
  text: string
  detail: string
  image: string
}

export interface AnniversaryData {
  names: string
  since: string
  dedication: string
  openingLine: string
  openingBody: string
  heroPhotos: {
    warm: AnniversaryPhoto
    dinner: AnniversaryPhoto
    candle: AnniversaryPhoto
    small: AnniversaryPhoto
  }
  scenes: AnniversaryScene[]
  letters: AnniversaryLetter[]
  chapters: AnniversaryChapter[]
  chapterSurprise: string
  tomorrowLine: string
  tomorrowBody: string
  closingKicker: string
  closingHeading: string
  closingNote: string
  secret: string
  closingPhotos: AnniversaryPhoto[]
}

export const anniversaryData: AnniversaryData = {
  names: 'Maya & Jonah',
  since: 'A quiet April, and every ordinary day after',
  dedication: 'For my favourite person, always',
  openingLine: 'Love lives in the little yeses.',
  openingBody: 'In the ordinary mornings, the long way home, the jokes that never get old. In every small choice that says: still you.',
  heroPhotos: {
    warm: {
      src: `${assets}/hero-warm.jpg`,
      alt: 'A couple in warm evening light',
      caption: 'the night we stayed too long',
    },
    dinner: {
      src: `${assets}/hero-dinner.jpg`,
      alt: 'A candlelit table shared with people we love',
      caption: 'our people, our table',
    },
    candle: {
      src: `${assets}/hero-candle.jpg`,
      alt: 'A restaurant table waiting for an ordinary evening',
      caption: 'another little yes',
    },
    small: {
      src: `${assets}/hero-small.jpg`,
      alt: 'A quiet close moment',
      caption: 'still you',
    },
  },
  scenes: [
    {
      label: 'Nothing spectacular.',
      title: 'Everything important.',
      text: 'The ordinary little moments that somehow became our favourites.',
      image: `${assets}/scene-ordinary.jpg`,
    },
    {
      label: 'Sunset sirens',
      title: 'Sunset sirens',
      text: 'The places, sunsets and spontaneous adventures that became our stories.',
      image: `${assets}/scene-sunset.jpg`,
    },
    {
      label: 'A thousand words',
      title: 'A thousand words',
      text: 'All the things we have lived, laughed about and somehow made ours.',
      image: `${assets}/scene-words.jpg`,
    },
  ],
  letters: [
    {
      id: 'listen',
      number: 'Letter 1',
      title: 'The way you listen',
      teaser: 'For the louder days.',
      reminder: 'You have people who make every place feel like home.',
      body: 'On the days when the world gets a little too loud, remember that you will always have someone who wants to listen. Every version of you deserves that.',
      image: `${assets}/letter-listen.jpg`,
      annotation: 'open when you need a soft place',
    },
    {
      id: 'everyday',
      number: 'Letter 2',
      title: 'The everyday you',
      teaser: 'For the ordinary mornings.',
      reminder: "Don't forget to enjoy the little things.",
      body: 'I hope you never stop noticing the little things. Your morning face, your silly stories, the way you make ordinary days feel like something worth remembering.',
      image: `${assets}/letter-everyday.jpg`,
      annotation: 'keep this in a kitchen drawer',
    },
    {
      id: 'future',
      number: 'Letter 3',
      title: 'The future note',
      teaser: 'For everything still ahead.',
      reminder: "There's still so much waiting for us.",
      body: "Here's to everything we haven't done yet, all the places we haven't seen and all the little yeses still waiting for us.",
      image: `${assets}/letter-future.jpg`,
      annotation: 'do not open too soon',
    },
  ],
  chapters: [
    {
      label: 'The beginning',
      date: 'April, once',
      title: 'Before it had a name',
      text: 'The first conversation. The first laugh that lasted too long. The moment an ordinary day quietly became the start of us.',
      detail: 'Add one small detail from this beginning here.',
      image: `${assets}/chapter-1.jpg`,
    },
    {
      label: 'Somewhere along the way',
      date: 'A summer in between',
      title: 'A place that became ours',
      text: 'Favourite orders, familiar roads, the comfort of knowing exactly who to look for in a room. The map filled itself in.',
      detail: 'Add a favorite detail from this place here.',
      image: `${assets}/chapter-2.jpg`,
    },
    {
      label: 'Right here, right now',
      date: 'Still unfolding',
      title: 'Still my favourite yes',
      text: 'Not because every day is perfect, but because we keep finding our way back to the little things that make this ours.',
      detail: 'Add one detail from the life you are still building here.',
      image: `${assets}/chapter-3.jpg`,
    },
  ],
  chapterSurprise: "Somehow, every little chapter brought us here. And if I had to choose again, I'd still find my way to you.",
  tomorrowLine: 'In every version of tomorrow, you.',
  tomorrowBody: 'Here is to the ordinary days that become our favourite memories, and the little yeses we have not said yet.',
  closingKicker: 'Some stories are still being written.',
  closingHeading: 'And I hope this one keeps going.',
  closingNote: 'For Maya & Jonah, and all the unremarkable Tuesdays that became the plot.',
  secret: 'P.S. I would say yes again. A thousand times.',
  closingPhotos: [
    { src: `${assets}/close-1.jpg`, alt: 'A celebration kept close', caption: 'the day it felt official' },
    { src: `${assets}/close-2.jpg`, alt: 'Walking together', caption: 'the long way home' },
    { src: `${assets}/close-3.jpg`, alt: 'A wide horizon', caption: 'everything still ahead' },
  ],
}
