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
                    : <h3 className='text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold'>The server is down</h3>
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
