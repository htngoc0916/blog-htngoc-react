import React from 'react'

const AboutBanner = React.lazy(() => import('~/modules/about/AboutBanner'))
const AboutIntroduction = React.lazy(() => import('~/modules/about/AboutIntroduction'))
const AboutProject = React.lazy(() => import('~/modules/about/AboutProject'))
const AboutSkills = React.lazy(() => import('~/modules/about/AboutSkills'))
const AboutSendToMail = React.lazy(() => import('~/modules/about/AboutSendToMail'))
const AboutEducation = React.lazy(() => import('~/modules/about/AboutEducation'))
const AboutContact = React.lazy(() => import('~/modules/about/AboutContact'))
const AboutFooter = React.lazy(() => import('~/modules/about/AboutFooter'))

export default function AboutPage() {
  return (
    <>
      <AboutBanner className='dark:bg-darkbg'></AboutBanner>
      <AboutIntroduction className='dark:bg-darkbg2'></AboutIntroduction>
      <AboutProject className='dark:bg-darkbg2'></AboutProject>
      <AboutSkills className='bg-text8 dark:bg-darkbg3'></AboutSkills>
      <AboutSendToMail className='bg-[#090e34] dark:bg-darkbg'></AboutSendToMail>
      <AboutEducation className='dark:bg-darkbg3 '></AboutEducation>
      <AboutContact className='bg-text8 dark:bg-darkbg2'></AboutContact>
      <AboutFooter className='bg-[#090e34] dark:bg-darkbg'></AboutFooter>
    </>
  )
}
