import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Card } from './types/Card';

type ModalProps = {
    card: Card;
    open: boolean;
    close: () => void;
};

function Modal({ card, open, close }: ModalProps) {
    function closeModal() {
        close();
    }

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" onClose={closeModal} className="relative z-50">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
                </Transition.Child>
                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 w-screen overflow-y-auto">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        {/* Container to center the panel */}
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-700 p-6 text-center text-white align-middle shadow-xl transition-all">
                                <div className="flex justify-center items-center flex-col">
                                    <img className="w-1/2 lg:w-3/4" src={`cards/${card.image}`} alt="card face" />
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 mt-8">
                                        {card.name}
                                    </Dialog.Title>
                                    <p className="mt-4">{card.summary}</p>
                                    <div className="mt-8">
                                        <button
                                            className="font-sans font-sans text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                            onClick={closeModal}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default Modal;
