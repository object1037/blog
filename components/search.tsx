import { InstantSearch, Hits, SearchBox, Configure, Pagination, PoweredBy } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import Hit from './hit'
import Modal from 'react-modal'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MultipleQueriesQuery } from '@algolia/client-search'
import clsx from 'clsx'

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
  }

  function closeModal() {
    setIsOpen(false);
  }

  const searchButtonStyle = [
    'p-3',
    'rounded-full',
    'text-lg',
    'hover:bg-gray-100',
    'dark:hover:bg-gray-800',
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
    'p-8',
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
    'px-6',
    'sm:px-12',
    'py-12',
    'sm:py-24',
  ]

  return (
    <>
    <button onClick={() => openModal()} aria-label="Search" className={clsx(searchButtonStyle)}>
      <FiSearch />
    </button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
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