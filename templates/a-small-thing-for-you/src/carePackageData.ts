const assets = '/templates/a-small-thing-for-you'

export interface CareGift {
  id: string
  label: string
  title: string
  text: string
  extra: string
  image: string
  imageAlt: string
}

export interface CareAward {
  id: string
  label: string
  title: string
  official: string
  extra: string
}

export interface CarePhoto {
  src: string
  alt: string
  caption: string
}

export interface CarePackageData {
  recipient: string
  kicker: string[]
  heading: string
  lede: string
  gifts: CareGift[]
  awards: CareAward[]
  reminderTitle: [string, string]
  reminderBody: string
  reminderNote: string
  closingHeading: string
  closingBody: string
  closingNote: string
  secret: string
  closingPhotos: CarePhoto[]
}

export const carePackageData: CarePackageData = {
  recipient: 'Sam',
  kicker: ['No birthday.', 'No reason.', 'Just you.'],
  heading: 'A small thing for you.',
  lede: 'Because sometimes someone deserves a little corner of the internet filled with good things. This one is yours to open, whenever.',
  gifts: [
    {
      id: 'compliment',
      label: 'For the days you forget',
      title: 'A tiny compliment',
      text: 'You have this way of making people feel noticed. I hope someone reminds you how special that is today.',
      extra: 'If nobody said it out loud today, consider this the reminder. You make rooms kinder without trying.',
      image: `${assets}/gift-compliment.jpg`,
      imageAlt: 'Folded clothes, quietly put away',
    },
    {
      id: 'memory',
      label: 'Filed under: us',
      title: 'A memory to keep',
      text: 'Remember that time we laughed so hard that absolutely nothing made sense?',
      extra: 'I would live that ridiculous afternoon again, gladly. Keep it somewhere you can find on a grey day.',
      image: `${assets}/gift-memory.jpg`,
      imageAlt: 'A table of fruit and ordinary sweetness',
    },
    {
      id: 'song',
      label: 'A little soundtrack',
      title: 'A song for the walk home',
      text: 'Put on your favourite song, take the long way home.',
      extra: 'Play it once for the walk, and once more for the version of you that got home. No playlist required. You already know the one.',
      image: `${assets}/gift-song.jpg`,
      imageAlt: 'A quiet chair waiting by the window',
    },
  ],
  awards: [
    {
      id: 'warmer',
      label: 'Award 1',
      title: 'Expert at making a room feel warmer',
      official: 'It is official because we said so. No further evidence required.',
      extra: 'You walk in and the air rearranges itself around kindness. That is a real talent.',
    },
    {
      id: 'snack',
      label: 'Award 2',
      title: 'Most likely to have a good snack',
      official: 'It is official because we said so. No further evidence required.',
      extra: 'The snack, the timing, the quiet generosity of it. You always think of the small comforts.',
    },
    {
      id: 'important',
      label: 'Award 3',
      title: 'A very important person, actually',
      official: 'It is official because we said so. No further evidence required.',
      extra: 'Not in a loud way. In the way that actually counts, and that people feel even when you do not.',
    },
  ],
  reminderTitle: ["You don't have", 'to earn being loved.'],
  reminderBody: 'Not by being useful. Not by being funny. Not by having a perfect day. You are already worth all the good things.',
  reminderNote: 'If today feels a little too much, let this be enough: you matter, you are loved, and you do not have to do anything to deserve either.',
  closingHeading: 'Keep the little things.',
  closingBody: 'They have a way of becoming the big things.',
  closingNote: 'for Sam, for no reason at all',
  secret: 'P.S. This was never a small thing. I just wanted it to feel like one.',
  closingPhotos: [
    { src: `${assets}/close-linen.jpg`, alt: 'Soft folded linen', caption: 'the quiet of a made bed' },
    { src: `${assets}/close-tea.jpg`, alt: 'A cup of tea', caption: 'sit down for a minute' },
    { src: `${assets}/close-still.jpg`, alt: 'A small bunch of flowers', caption: 'nothing grand, still lovely' },
  ],
}
