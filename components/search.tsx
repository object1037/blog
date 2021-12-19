import { InstantSearch, Hits, SearchBox, Configure, Pagination, PoweredBy } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import Link from 'next/link'
import Modal from 'react-modal'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
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

  function afterOpenModal() {
    (document.getElementsByClassName("ais-SearchBox-input")[0] as HTMLElement)?.focus();
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
      'hover:bg-gray-100',
      'dark:hover:bg-gray-800',
      'border-t',
      'border-gray-200',
      'dark:border-gray-700',
      'transition',
      'px-5',
      'py-6',
      'w-full'
    ]
    return (
      <>
      <Link href={`/posts/${hit.objectID}`} >
        <a className={clsx(cardStyle)}  onClick={() => closeModal()}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 truncate">{hit.title}</h2>
          <p className="text-gray-900 dark:text-gray-100 truncate">{hit.description}</p>
        </a>
      </Link>
      </>
    )
  }

  const searchButtonStyle = [
    'p-3',
    'rounded-full',
    'text-lg',
    'hover:bg-gray-100',
    'dark:hover:bg-gray-800',
    'outline-none',
    'transition'
  ]
  const modalStyle = [
    'bg-white',
    'dark:bg-gray-900',
    'border',
    'border-transparent',
    'dark:border-gray-700',
    'rounded-md',
    'outline-none',
    'w-full',
    'mx-auto',
    'md:max-w-5xl',
    'p-4',
    'sm:px-8',
    'sm:pt-8',
    'max-h-full',
    'overflow-auto'
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
      onAfterOpen={afterOpenModal}
      contentLabel="Delete Confirmation"
      className={clsx(modalStyle)}
      overlayClassName={clsx(overlayStyle)}
    >
    <InstantSearch indexName="blog_datas" searchClient={searchClient}>
      <Configure hitsPerPage={3} />
      <SearchBox />
      <Hits hitComponent={Hit} />
      <Pagination />
      <PoweredBy />
    </InstantSearch>
    </Modal>
    </>
  )
}