export default function Card(props: any) {
  // console.log('props', props);
  return (

      <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">

          <button id="dropdownButton" data-dropdown-toggle="dropdown"
                  className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>
          <div id="dropdown"
               className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
            <ul className="py-1" aria-labelledby="dropdownButton">
              <li>
                <a href="#"
                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
              </li>
              <li>
                <a href="#"
                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export
                  Data</a>
              </li>
              <li>
                <a href="#"
                   className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
              </li>
            </ul>
          </div>

        </div>
        <div className="flex-1 w-full mx-auto p-4 h-full overflow-y-scroll">
          <div className="flex items-center h-full">
            <div className="text-2xl">
              {props.content}
            </div>
          </div>


        </div>
      </div>




  )
}

