import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

const Slider = (props) => {
  const { open, setOpen } = props
  const [selectCount, setSelectCount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState(Array.from({ length: selectCount }, () => ""));

  const addSelectMenu = () => {
    setSelectCount(selectCount + 1);
  };

  const saveSegment = () => {
    const segmentData = selectedOptions.filter(option => option !== "");
    console.log("Segment Data:", JSON.stringify(segmentData));
  };

  const handleSelectChange = (index, event) => {
    const value = event.target.value;
    setSelectedOptions(prevOptions => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-0"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
                    <div className="p-4 bg-cyan-400">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-100">
                        Saving Segment
                      </Dialog.Title>
                    </div>
                    {/* Your content */}
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div>
                        <label htmlFor="name" className="">
                          Enter the Name of the Segment
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                          placeholder="Name of the Segment"
                        />
                      </div>
                      <p className='font-normal p-2.5 text-sm'>To save your segment, you need to add the schemas to build the query.</p>
                      {Array.from({ length: selectCount }, (_, index) => (
                        <div key={index}>

                          <select
                            id={`select-${index}`}
                            name={`select-${index}`}
                            className="my-2 relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 sm:text-sm sm:leading-6"
                            value={selectedOptions[index]}
                            onChange={(event) => handleSelectChange(index, event)}
                          >
                            <option className='text-gray-500 p-2 font-semibold m-1' >Add schema to segment</option>
                            <option className='text-gray-500 p-2 font-semibold m-1' value="first_name">First Name</option>
                            <option className='text-gray-500 p-2 font-semibold m-1' value="last_name">Last Name</option>
                            <option className='text-gray-500 p-2 font-semibold m-1' value="gender">Gender</option>
                            <option className='text-gray-500 p-2 font-semibold m-1' value="age">Age</option>
                            <option className='text-gray-500 p-2 font-semibold m-1' value="account_name">Account Name</option>
                            <option className='text-gray-500 p-2 font-semibold m-1' value="city">City</option>
                            <option className='text-gray-500 p-2 font-semibold m-1' value="state">State</option>

                          </select>
                        </div>
                      ))}
                      <button
                        onClick={addSelectMenu}
                        className="mt-4 py-2 text-sm font-semibold decoration-cyan-500 underline text-cyan-500 rounded-md hover:text-cyan-600 focus:outline-none focus:decoration-cyan-600 flex gap-2 items-center"
                      >
                        <PlusCircleIcon className="h-5 w-5 text-cyan-500" />
                        Add Select Menu
                      </button>
                    </div>
                    <div className="mt-3 flex sm:ml-4 sm:mt-0">
                      <button
                        onClick={saveSegment}
                        type="button"
                        className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-cyan-500"
                      >
                        Save the Segment
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-red-100 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-red-600 hover:text-red-100 shadow-sm "
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Slider;
