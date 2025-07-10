import React, { useEffect, useState, useRef } from 'react'
import { List, Card, Typography, Spin, Alert } from 'antd'
import { useGetNewsQuery } from '../store/reducers/news/newsAPI'
import { NewsItem } from '../store/reducers/news/news.types'

const { Paragraph } = Typography

//TODO: it is worth making fake news locally or making a node server (only 100 requests free)

const NewsPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<NewsItem[]>([])
  const { data, isFetching, isError, error } = useGetNewsQuery(page)
  const loader = useRef<HTMLDivElement | null>(null)
  const [hasMore, setHasMore] = useState(true) // Track if more data is available

  // Append new items when data is received
  useEffect(() => {
    if (data?.data) {
      setItems((prev) => [...prev, ...data.data])
      // Check if there are more pages to load (based on meta data)
      if (data.meta.returned < 10 || (data.meta.found && items.length >= data.meta.found)) {
        setHasMore(false) // No more data to fetch
      }
    }
  }, [data, items.length])

  useEffect(() => {
    const target = loader.current

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && data?.meta.returned) {
          setPage((p) => p + 1)
        }
      },
      { threshold: 1 },
    )

    if (target) obs.observe(target)
    return () => {
      if (target) {
        obs.unobserve(target)
      }
    }
  }, [isFetching, data?.meta.returned])

  // Handle errors
  if (isError) {
    if ('status' in error && error.status === 402) {
      return (
        <Alert
          message='Usage Limit Reached'
          description='The API usage limit for this account has been reached. Please try again later or upgrade your plan at https://thenewsapi.com/pricing.'
          type='error'
          showIcon
        />
      )
    }
    return (
      <Alert
        message='Error loading news'
        description={JSON.stringify(error)}
        type='error'
        showIcon
      />
    )
  }

  return (
    <div className={'news-page'}>
      {isFetching && !items.length ? (
        <Spin tip='Loading news...' />
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={items}
            renderItem={(item) => (
              <List.Item key={item.uuid}>
                <Card
                  title={item.title}
                  extra={<span>{new Date(item.published_at).toLocaleString()}</span>}
                  cover={item.image_url && <img alt={item.title} src={item.image_url} />}
                >
                  <Paragraph ellipsis={{ rows: 3 }}>{item.description}</Paragraph>
                  <a href={item.url} target='_blank' rel='noopener noreferrer'>
                    View...
                  </a>
                </Card>
              </List.Item>
            )}
          />
          {hasMore && (
            <div ref={loader} style={{ textAlign: 'center', marginTop: 16 }}>
              {isFetching ? <Spin /> : 'Scroll to load more'}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default NewsPage
