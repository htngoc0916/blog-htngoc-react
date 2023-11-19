import { v4 as uuidv4 } from 'uuid'

export function dataMenu() {
  return [
    {
      id: uuidv4(),
      path: '/',
      title: 'Home',
      type: 'public'
    },
    {
      id: uuidv4(),
      path: 'about',
      title: 'About',
      type: 'public'
    },
    {
      id: uuidv4(),
      path: 'auth/dashboard',
      title: 'Dashboard',
      type: 'private'
    },
    {
      id: uuidv4(),
      path: 'auth/user',
      title: 'Setting',
      type: 'private'
    }
  ]
}
