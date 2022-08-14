import { InstantSearch, Hits, SearchBox, Configure, Pagination, PoweredBy, Snippet } from 'react-instantsearch-hooks-web'
import algoliasearch, { SearchClient } from 'algoliasearch/lite'
import { MultipleQueriesResponse, MultipleQueriesQuery } from "@algolia/client-search"
import Link from 'next/link'
import clsx from 'clsx'

const SearchModalContent = ({
  applicationId,
  searchApiKey,
  closeModal
}: {
  applicationId: string
  searchApiKey: string
  closeModal: () => void 
}) => {
  const algoliaClient = algoliasearch(applicationId, searchApiKey)
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
  return (
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
  )
}

export default SearchModalContent