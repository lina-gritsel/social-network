import { FC } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

import styles from './RootPage.module.scss'

const RootPage: FC = () => {
  return (
    <div>
      RootPage
      <Button>Click me</Button>
      <Button outlined>Click me</Button>
      <Modal open={false} title={'You are so cute <3'} />
    </div>
  )
}

export default RootPage
