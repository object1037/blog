import { InstantSearch, Hits, SearchBox, Configure, Pagination, PoweredBy, Snippet } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import Link from 'next/link'
import Modal from 'react-modal'
import { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { MultipleQueriesQuery } from '@algolia/client-search'
import clsx from 'clsx'
import backfaceFixed from '../utils/backfaceFixed'

Modal.setAppElement('#__next')

export default function Search() {
  const [modalIsOpen, setIsOpen] = useState(false)

  if (!process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || !process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY) {
    return <></>
  }
  const algoliaClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY)
  const searchClient = {
    ...algoliaClient,
    search(requests: MultipleQueriesQuery[]) {
      if (requests.every(({ params }) => !params?.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
          })),
        })
      }
      return algoliaClient.search(requests);
    },
  }

  function openModal() {
    setIsOpen(true);
    backfaceFixed(true);
  }

  function closeModal() {
    setIsOpen(false);
    backfaceFixed(false);
  }

  function Hit({
    hit
  }: {
    hit: {
      objectID: string
      title: string
      description: string
      content: string
    }
  }) {
    const cardStyle = [
      'hover:bg-ngray-100',
      'dark:hover:bg-ngray-800',
      'border-t',
      'border-ngray-200',
      'dark:border-ngray-700',
      'transition',
      'px-5',
      'py-6',
      'w-full'
    ]
    return (
      <>
      <Link href={`/posts/${hit.objectID}`} >
        <a className={clsx(cardStyle)}  onClick={() => closeModal()}>
          <h2 className="text-lg font-semibold text-ngray-900 dark:text-ngray-100 mb-3 truncate">{hit.title}</h2>
          <p className="text-ngray-900 dark:text-ngray-100 truncate">
            <Snippet attribute="content" hit={hit} />
          </p>
        </a>
      </Link>
      </>
    )
  }

  const searchButtonStyle = [
    'p-[11px]',
    'rounded-full',
    'text-lg',
    'hover:bg-ngray-100',
    'dark:hover:bg-ngray-800',
    'outline-none',
    'transition'
  ]
  const closeButtonStyle = [
    'text-lg',
    'text-ngray-300',
    'hover:text-ngray-900',
    'dark:text-ngray-700',
    'dark:hover:text-ngray-100',
    'outline-none',
    'transition',
  ]
  const modalStyle = [
    'bg-white',
    'dark:bg-ngray-900',
    'border',
    'border-transparent',
    'dark:border-ngray-700',
    'rounded-md',
    'outline-none',
    'w-full',
    'mx-auto',
    'md:max-w-5xl',
    'p-1',
    'pb-4',
    'sm:p-3',
    'sm:pb-4',
    'max-h-full',
    'overflow-auto',
    'relative'
  ]
  const overlayStyle = [
    'bg-black',
    'bg-opacity-20',
    'backdrop-blur-sm',
    'dark:bg-opacity-50',
    'fixed',
    'inset-0',
    'z-20',
    'px-5',
    'sm:px-12',
    'pt-12',
    'sm:pt-24',
    'pb-5',
    'sm:pb-12'
  ]
  return (
    <>
    <button onClick={() => openModal()} aria-label="Search" className={clsx(searchButtonStyle)}>
      <FiSearch />
    </button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Search modal"
      className={clsx(modalStyle)}
      overlayClassName={clsx(overlayStyle)}
    >
      <div className='flex flex-row-reverse w-full mb-4 sm:mb-8 pr-2 pt-2 sm:p-0 sm:pt-1 sm:pr-1'>
        <button onClick={() => closeModal()} aria-label="close modal" className={clsx(closeButtonStyle)}>
          <FiX />
        </button>
      </div>
      <InstantSearch indexName="blog_datas" searchClient={searchClient}>
        <Configure hitsPerPage={3} attributesToSnippet={['content:20']} />
        <SearchBox autoFocus />
        <Hits hitComponent={Hit} />
        <Pagination />
        <PoweredBy />
      </InstantSearch>
    </Modal>
    </>
  )
}