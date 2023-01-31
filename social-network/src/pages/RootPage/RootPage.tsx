import { FC } from 'react'
import Button from '../../components/Button'
import Menu from '../../components/Menu'
import Modal from '../../components/Modal'

import styles from './RootPage.module.scss'

const RootPage: FC = () => {
  return (
    <div>
      <Button>Follow</Button>
      <Button outlined>Click me</Button>
      <Modal open={false} title={'You are so cute <3'} />
      <Menu />
    </div>
  )
}

export default RootPage
