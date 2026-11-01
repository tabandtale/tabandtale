const assets = '/templates/all-your-eras'

export interface BirthdayMessage {
  id: string
  sender: string
  relationship: string
  message: string
  image?: string
}

export interface VoiceNote {
  id: string
  sender: string
  caption: string
  durationLabel: string
  audioSrc?: string
  image?: string
}

export interface BirthdayEra {
  label: string
  caption: string
  image?: string
}

export interface ScrapbookExtra {
  src: string
  caption: string
  rotate: string
}

export interface CollagePhoto {
  src: string
  alt: string
  caption?: string
}

export interface BirthdayData {
  name: string
  nickname: string
  birthday: string
  introduction: string
  favouriteThings: string[]
  knownFor: string
  heroImage?: string
  polaroidCaption: string
  collageFront: CollagePhoto[]
  collageBack: CollagePhoto[]
  eras: BirthdayEra[]
  scrapbookExtras: ScrapbookExtra[]
  messages: BirthdayMessage[]
  award: {
    title: string
    explanation: string
  }
  letter: {
    heading: string
    content: string
    signature: string
  }
  voiceNotes: VoiceNote[]
  closingImages: { src: string; caption: string }[]
  closingNote: string
}

export const birthdayData: BirthdayData = {
  name: 'Alex',
  nickname: 'Lex',
  birthday: '14 March · the plot officially thickens',
  introduction: 'A main character with a soft heart, a chaotic laugh and an unfair talent for making ordinary days feel like a plot twist.',
  favouriteThings: ['Late-night talks', 'Playlists that spiral', 'People who stay', 'Cake for breakfast'],
  knownFor: 'Turning a Tuesday into a story worth retelling.',
  heroImage: `${assets}/hero.jpg`,
  polaroidCaption: 'Personal Shoots',
  collageFront: [
    { src: `${assets}/hero.jpg`, alt: 'Portrait of Alex', caption: 'main character energy' },
    { src: `${assets}/era-extra-1.jpg`, alt: 'A candid memory', caption: 'no context. just vibes.' },
    { src: `${assets}/tiny.jpg`, alt: 'A childhood memory', caption: 'tiny legend' },
  ],
  collageBack: [
    { src: `${assets}/flip-main.jpg`, alt: 'Friends laughing together', caption: 'the people who stay' },
    { src: `${assets}/flip-a.jpg`, alt: 'A warm family moment', caption: 'home, somehow' },
    { src: `${assets}/flip-b.jpg`, alt: 'A celebration with balloons', caption: 'party mode: on' },
  ],
  eras: [
    { label: 'TINY HUMAN', caption: 'Small shoes. Huge opinions.', image: `${assets}/tiny.jpg` },
    { label: 'SCHOOL SURVIVAL', caption: 'Questionable hair. Unmatched lore.', image: `${assets}/school.jpg` },
    { label: 'THE PLOT TWIST', caption: 'Character development, loudly.', image: `${assets}/twist.jpg` },
    { label: 'MAIN CHARACTER', caption: 'Currently iconic. Obviously.', image: `${assets}/main.jpg` },
  ],
  scrapbookExtras: [
    { src: `${assets}/era-extra-1.jpg`, caption: 'no context. just vibes.', rotate: '-8deg' },
    { src: `${assets}/era-extra-2.jpg`, caption: 'the group chat, IRL', rotate: '7deg' },
    { src: `${assets}/party.jpg`, caption: 'the night it became lore', rotate: '-3deg' },
  ],
  messages: [
    {
      id: 'riya',
      sender: 'Riya',
      relationship: 'partner in crime',
      message: 'You make every boring thing 10x funnier just by being there. Never stop being your ridiculous, wonderful self. Love you loads.',
      image: `${assets}/riya.jpg`,
    },
    {
      id: 'sibling',
      sender: 'Your favourite sibling',
      relationship: 'professional menace',
      message: 'I would roast you right now but apparently this is a wholesome website. Happy birthday, loser. You are my favourite human. Do not tell anyone.',
      image: `${assets}/sibling.jpg`,
    },
    {
      id: 'parents',
      sender: 'Mum & Dad',
      relationship: 'your original fan club',
      message: 'Watching you become the person you are today has been the greatest gift. We are proud of you in more ways than you know.',
      image: `${assets}/parents.jpg`,
    },
  ],
  award: {
    title: 'CEO of Chaos',
    explanation: 'For making group chats funnier, hard days softer, and every room a little more itself the moment you walk in. The jury (the group chat) was unanimous. The evidence was overwhelming. The award is yours.',
  },
  letter: {
    heading: 'Hey, Lex.',
    content: 'There are a thousand things we could say about you, and somehow none of them feel like quite enough.\n\nYou are the person who remembers the tiny details, who turns a quiet evening into a core memory, who makes people feel like they have a place to land.\n\nWe hope this next year gives you the kind of happiness that sneaks up on you in ordinary moments. The belly laughs. The people who make you feel safe. The plans that work out even better than you imagined.\n\nThank you for being exactly the person you are. We are so glad the universe made you. Here is to every version of you that got you here, and every version you have yet to become.',
    signature: 'All our love, always.',
  },
  voiceNotes: [
    { id: 'note-1', sender: 'Riya', caption: '“I hope you know how loved you are.”', durationLabel: '0:18', image: `${assets}/riya.jpg` },
    { id: 'note-2', sender: 'Your favourite sibling', caption: '“Okay, I am not crying. You are.”', durationLabel: '0:24', image: `${assets}/sibling.jpg` },
    { id: 'note-3', sender: 'Mum & Dad', caption: '“We are so proud of you.”', durationLabel: '0:31', image: `${assets}/parents.jpg` },
  ],
  closingImages: [
    { src: `${assets}/close-1.jpg`, caption: 'the people who stayed' },
    { src: `${assets}/close-2.jpg`, caption: 'golden hour, as usual' },
    { src: `${assets}/close-3.jpg`, caption: 'a night that became a story' },
    { src: `${assets}/close-4.jpg`, caption: 'proof of joy' },
  ],
  closingNote: 'Still the favourite plotline. Still just getting started.',
}
