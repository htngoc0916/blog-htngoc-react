import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import {
  IconDatabase,
  IconDotNet,
  IconGithub,
  IconHtml,
  IconLanguageJava,
  IconReact,
  IconSpringBoot,
  IconTailwind
} from '~/components/icons'

export interface Skill {
  id: number | string
  icon: React.ReactNode
  title: string
  job: string
}

export const skillData = [
  {
    id: uuidv4(),
    icon: <IconLanguageJava />,
    title: 'Java',
    job: 'Backend'
  },
  {
    id: uuidv4(),
    icon: <IconDotNet />,
    title: 'C# / .net',
    job: 'Backend'
  },
  {
    id: uuidv4(),
    icon: <IconSpringBoot />,
    title: 'Spring',
    job: 'Backend'
  },
  {
    id: uuidv4(),
    icon: <IconDatabase />,
    title: 'MySql / MsSql',
    job: 'Backend'
  },
  {
    id: uuidv4(),
    icon: <IconHtml />,
    title: 'Html / Css',
    job: 'Frontend'
  },
  {
    id: uuidv4(),
    icon: <IconReact />,
    title: 'JS / React',
    job: 'Frontend'
  },
  {
    id: uuidv4(),
    icon: <IconTailwind />,
    title: 'Tailwind',
    job: 'Frontend'
  },
  {
    id: uuidv4(),
    icon: <IconGithub />,
    title: 'Git',
    job: 'Other'
  }
]
