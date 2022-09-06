import Modal from 'react-modal'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import clsx from 'clsx'
import backfaceFixed from '../utils/backfaceFixed'
import dynamic from 'next/dynamic'

Modal.setAppElement('#__next')

export default function Search() {
  const [modalIsOpen, setIsOpen] = useState(false)

  if (
    !process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID ||
    !process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
  ) {
    return <></>
  }

  function openModal() {
    setIsOpen(true)
    backfaceFixed(true)
  }

  function closeModal() {
    setIsOpen(false)
    backfaceFixed(false)
  }

  const searchButtonStyle = [
    'p-[11px]',
    'rounded-full',
    'text-lg',
    'hover:bg-ngray-100',
    'dark:hover:bg-ngray-800',
    'outline-none',
    'transition',
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
    'relative',
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
    'sm:pb-12',
  ]
  const InstantSearch = dynamic(() => import('./searchModalContent'), {
    loading: () => (
      <div className="flex">
        <div className="flex-1 mx-3 my-4 sm:my-6 border border-ngray-400 dark:border-ngray-500 text-ngray-500 dark:text-ngray-400 py-4 px-6 rounded-lg">
          loading...
        </div>
        <button
          onClick={() => closeModal()}
          aria-label="close modal"
          className="text-sm text-ngray-400 hover:text-ngray-900 dark:text-ngray-500 dark:hover:text-ngray-100 outline-none transition mr-5 p-2 my-auto"
        >
          ESC
        </button>
      </div>
    ),
  })
  return (
    <>
      <button
        onClick={() => openModal()}
        aria-label="Search"
        className={clsx(searchButtonStyle)}
      >
        <FiSearch />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Search modal"
        className={clsx(modalStyle)}
        overlayClassName={clsx(overlayStyle)}
      >
        <InstantSearch
          closeModal={closeModal}
          applicationId={process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}
          searchApiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY}
        />
      </Modal>
    </>
  )
}
