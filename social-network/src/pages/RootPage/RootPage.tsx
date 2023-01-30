import { FC } from 'react'
import Button from '../../components/Button'

import styles from './RootPage.module.scss'

const RootPage: FC = () => {
  return (
    <div>
      RootPage
      <Button>Click me</Button>
      <Button outlined>Click me</Button>
    </div>
  )
}

export default RootPage
