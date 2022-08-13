import { InstantSearch, Hits, SearchBox, Configure, Pagination, PoweredBy, Snippet } from 'react-instantsearch-hooks-web'
import algoliasearch, { SearchClient } from 'algoliasearch/lite'
import { MultipleQueriesResponse, MultipleQueriesQuery } from "@algolia/client-search"
import Link from 'next/link'
import Modal from 'react-modal'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import clsx from 'clsx'
import backfaceFixed from '../utils/backfaceFixed'

Modal.setAppElement('#__next')

export default function Search() {
  const [modalIsOpen, setIsOpen] = useState(false)

  if (!process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || !process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY) {
    return <></>
  }
  const algoliaClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY)
  const searchClient: SearchClient = {
    ...algoliaClient,
    search: <SearchResponse,>(requests: Readonly<MultipleQueriesQuery[]>) => {
      if (requests.every(({ params }) => !params?.query)) {
        return Promise.resolve<MultipleQueriesResponse<SearchResponse>>({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: true,
            query: "",
            params: "",
          })),
        });
      }

      return algoliaClient.search(requests)
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
      __position: number
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
          <p className="text-ngray-900 dark:text-ngray-100 truncate pb-0.5">
            <Snippet attribute="content" hit={hit} classNames={{
              highlighted: 'border-b-2 border-ppink-200 bg-transparent text-inherit'
            }} />
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
    'text-sm',
    'text-ngray-400',
    'hover:text-ngray-900',
    'dark:text-ngray-500',
    'dark:hover:text-ngray-100',
    'outline-none',
    'transition',
    'mr-5',
    'p-2',
    'my-auto'
  ]
  const modalStyle = [
    'bg-white',
    'dark:bg-ngray-900',
    'border',
    'border-transparent',
    'dark:border-ngray-700',
    'rounded-lg',
    'outline-none',
    'w-full',
    'mx-auto',
    'md:max-w-5xl',
    'p-1',
    'sm:p-3',
    'py-0',
    'sm:py-0',
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
      <InstantSearch indexName="blog_datas" searchClient={searchClient}>
        <Configure hitsPerPage={3} attributesToSnippet={['content:20']} />
        <div className='flex sticky top-0 bg-inherit pt-1 sm:pt-3'>
          <SearchBox placeholder='Search posts' classNames={{
            root: 'flex-1 rounded-lg bg-ngray-100 dark:bg-ngray-800 m-3 py-4 px-6',
            form: 'w-full flex',
            input: 'w-full bg-ngray-100 dark:bg-ngray-800 appearance-none outline-none',
            submitIcon: 'hidden',
            resetIcon: 'dark:fill-ngray-100'
          }} />
          <button onClick={() => closeModal()} aria-label="close modal" className={clsx(closeButtonStyle)}>
            ESC
          </button>
        </div>
        <Hits hitComponent={Hit} classNames={{
          root: 'mx-3 mt-3',
          item: 'flex',
        }} />
        <Pagination classNames={{
          root: 'mx-3 p-3 border-t border-ngray-200 dark:border-ngray-700 overflow-auto',
          list: 'justify-center gap-x-2 sm:gap-x-4',
          item: "inline-block flex items-center justify-center hover:bg-ngray-100 dark:hover:bg-ngray-800 rounded-full transition",
          link: "capsizedText py-3 px-3.5 text-center rounded-full",
          disabledItem: "text-ngray-300 dark:text-ngray-600 hover:bg-inherit dark:hover:bg-inherit",
          selectedItem: "bg-ngray-100 dark:bg-ngray-800",
          noRefinementRoot: 'hidden'
        }}/>
        <PoweredBy classNames={{
          root: 'border-t border-ngray-200 dark:border-ngray-700 mx-3 py-4 text-sm justify-end'
        }} />
      </InstantSearch>
    </Modal>
    </>
  )
}