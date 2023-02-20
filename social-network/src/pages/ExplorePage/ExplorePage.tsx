import { FC } from 'react'

import Layout from '../../components/Layout'

import TabsCategories, { useCategoriesTabs } from './components/TabsCategories'
import styles from './ExplorePage.module.scss'
import Loader from '../../components/Loader'
import NewsList from './components/NewsList'
import { useFetchNews } from './hooks'

const ExplorePage: FC = () => {
  const { category, onChangeCategory } = useCategoriesTabs()
  const { articles, isLoading } = useFetchNews(category)

  return (
    <Layout>
      <div className={styles.container}>
        <TabsCategories category={category} onChange={onChangeCategory} />
        {isLoading ? (
          <Loader className={styles.loading} />
        ) : (
          <NewsList articles={articles} />
        )}
      </div>
    </Layout>
  )
}

export default ExplorePage
