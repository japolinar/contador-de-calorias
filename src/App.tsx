
import { useReducer, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Form } from './components/Form'
import { activityReducer, initialState } from './reducers/activity-reducer'
import { ActivityList } from './components/ActivityList'
import { CalorieTracker } from './components/CalorieTracker'

function App() { 

  const [state, dispatch] = useReducer(activityReducer, initialState)
  //console.log(state);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities]);

  const canRestartApp = () => useMemo(()=> state.activities.length > 0 ,[state.activities])
  
  return (
    <>
      <header className=' bg-indigo-900 p-5 flex flex-col justify-center md:flex-row md:justify-center'>
        <div className=' flex justify-center gap-3 '>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <h1 className=' text-white uppercase font-bold text-3xl text-center'>Contador de Calorias</h1>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>  

        <div>
          <button 
            className=' bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-lg uppercase font-bold cursor-pointer border disabled:opacity-10 ms-20'
            disabled={!canRestartApp()}
            onClick={() => dispatch({type: 'restart-app'})}
          >
            Reiniciar APP
          </button>
        </div>
      </header> 

      <div className='bg-gray-200'>
        <section className=' py-8 px-5'>
          <div className=' max-w-4xl mx-auto'>
            <Form
              dispatch={dispatch}
              state={state}
            />
          </div>
        </section>  

        <section className=' bg-gray-800 py-10'>
          <div className=' max-w-4xl mx-auto'>
            <CalorieTracker
              activities={state.activities}
            />
          </div>
        </section>

        <section className=' pb-8 mx-auto max-w-4xl'>
          <ActivityList
            activities={state.activities}
            dispatch={dispatch}
          />
        </section>
      </div>

    </>
  )
}

export default App
