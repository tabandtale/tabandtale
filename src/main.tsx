import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ProfessionalPage from './ProfessionalPage'
import PersonalPage from './PersonalPage'
import './styles.css'
import AllYourEras from '../templates/all-your-eras/src/AllYourEras'
import { OurLittleUniverse } from '../templates/our-little-universe/src/OurLittleUniverse'
import { AThousandLittleYeses } from '../templates/a-thousand-little-yeses/src/AThousandLittleYeses'
import { ASmallThingForYou } from '../templates/a-small-thing-for-you/src/ASmallThingForYou'

const currentPath = window.location.pathname.replace(/\/+$/, '')
const isProfessionalPage = currentPath === '/professional'
const isPersonalPage = currentPath === '/personal'
const isAllYourEras = currentPath === '/templates/all-your-eras'
const isOurLittleUniverse = currentPath === '/templates/our-little-universe'
const isThousandLittleYeses = currentPath === '/templates/a-thousand-little-yeses'
const isSmallThing = currentPath === '/templates/a-small-thing-for-you'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>{isAllYourEras ? <AllYourEras /> : isOurLittleUniverse ? <OurLittleUniverse /> : isThousandLittleYeses ? <AThousandLittleYeses /> : isSmallThing ? <ASmallThingForYou /> : isProfessionalPage ? <ProfessionalPage /> : isPersonalPage ? <PersonalPage /> : <App />}</React.StrictMode>,
)
