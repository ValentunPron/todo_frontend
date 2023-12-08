import React from 'react';
import { Works } from './component/Works';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

async function fetchWorks() {
  const { data } = await axios.get('https://todo-backend-9bmu.onrender.com/api/works/get');

  return data;
}

async function createWork(works) {
  await axios.post('https://todo-backend-9bmu.onrender.com/api/works/post', {
    title: works,
  });
}

function App() {

  const queryClient = useQueryClient();
  const { data } = useQuery('works', fetchWorks);
  const mutation = useMutation(newWorks => createWork(newWorks), {
    onSuccess: () => queryClient.invalidateQueries(["works"])
  });

  const [newWorks, setNewWorks] = React.useState('');

  const onClickCreate = (work) => {
    mutation.mutate(work);

    setNewWorks('');
  }

  return (
    <div className='w-full py-2 min-h-screen flex justify-center items-stretch overflow-y-auto md:items-center'>
      <div className='container px-3'>
        <div className='w-full h-full border rounded m-auto shadow-md md:w-2/4'>
          <div className='bg-neutral-100 p-2 border-b-2 border-gray-500'>
            <h1 className='font-bold flex items-center'>
              Todo's
              {
                data && <span className='text-[12px] text-gray-500'>({data.length})</span>
              }
            </h1>
          </div>
          <div className='px-2 py-3'>
            <div>
              <div className="flex">
                <div className="relative w-full">
                  <input
                    type="search"
                    value={newWorks}
                    onChange={(e) => setNewWorks(e.target.value)}
                    className="block p-2 w-full z-20 text-sm text-gray-900 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Enter todo here" required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 end-[-2px] p-2 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => onClickCreate(newWorks)}
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='min-h-[300px] py-5 relative'>
              <div className='h-full'>
                {
                  data ?
                    data.map((work) => <Works title={work.title} status={work.status} id={work._id} key={work._id} />)
                    : <div className='text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold'>
                      <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                }
                {
                  data && data.length <= 0 && <h3 className='text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold'>The task list is empty</h3>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
