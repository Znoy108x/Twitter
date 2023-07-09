import React,{useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import TagsSearch from './TagsSearch'
const TagsPopup = ({ isOpen, setSelectedTag   , closeModal}) => {
    const [expand , setExpand] = useState("150px")
    const decreaseExpand = () =>{
        setExpand("150px")
        console.log("decreased after click")
    }
    const increaseExpand = () =>{
        setExpand("400px")
    }
    useEffect(() => {
        decreaseExpand()
    }, []);
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-80"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center" >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl   p-6 text-left align-middle shadow-xl transition-all  z-50 bg-twitter_gray" style={{height : expand}}>
                                    <div className="flex flex-col items-center w-full space-y-3">
                                        <span className="text-3xl text-white font-bold tracking-wide">Choose A <span className="text-transparent bg-clip-text bg-blue_purple">Tag!</span></span>
                                        <TagsSearch decreaseExpand={decreaseExpand} increaseExpand={increaseExpand} closeModal={closeModal} setSelectedTag={setSelectedTag}/>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default TagsPopup