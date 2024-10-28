import { useMemo, Dispatch } from 'react';
import { Activity } from '../types'
import { categories } from '../data/categories';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { ActiivityActions } from '../reducers/activity-reducer';
import Swal from "sweetalert2"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActiivityActions>
}

export const ActivityList = ({activities, dispatch}: ActivityListProps) => {
    //console.log(activities);  
    const categoryName = useMemo(()=> 
        (category: Activity['category']) => 
        categories.map((cat)=> cat.id === category ? cat.name : '' )
    , [activities])  

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    const handleDeleteActivity  = (id: Activity['id'])=>{
        Swal.fire({
            title: "Estas seguro en Eliminar?",            
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#312e81",
            cancelButtonColor: "#b91c1c",
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({type: 'delete-activity', payload: {id: id} })
                Swal.fire({
                    title: "Eliminado!",
                    text: "Su Actividad fue Eliminada.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }) 

    }

  return (
    <>
        <h2 className=' text-4xl font-bold text-slate-600 text-center uppercase'>
            Comidas y Actividades
        </h2>
        {isEmptyActivities ? 
            <div className=' px-10'>
                <p className=' bg-indigo-900 text-white text-center font-serif uppercase font-bold py-3 rounded-lg shadow mt-6'>No Hay actividaes Registradas</p>
            </div> : 
            
            activities.map((item)=>(
                <div 
                    key={item.id}
                    className=' px-8 bg-white mt-5 py-8 flex justify-between border border-spacing-1 rounded-lg shadow'
                >
                    <div className=' space-y-2 relative'>
                        <p className={` absolute -top-8 -left-8 px-10 py-2 rounded-lg text-white uppercase font-bold ${item.category === 1 ? ' bg-lime-700'  : ' bg-orange-700' }`}>
                            {categoryName(+item.category)}
                        </p>
                        <div>
                            <p className=' font-serif uppercase font-bold mt-4 text-decoration-line: underline'>{item.name}</p>
                            <p className=' font-bold text-3xl text-indigo-800 pt-2'>
                                {item.calory} {''}
                                <span>Calorias</span>
                            </p>
                        </div>
                    </div>
                    
                    <div className=' flex gap-5 items-center'>
                        <button
                            onClick={()=> dispatch({type: 'set-activeId', payload: {id: item.id} })}
                        >
                            <PencilSquareIcon
                                className=' h-8 w-8 text-green-700'
                            />                       
                        </button>
                        
                        <button
                            onClick={ () => handleDeleteActivity(item.id) }
                        >
                            <XCircleIcon
                                className=' h-8 w-8 text-red-700'
                        />                       
                        </button>
                    </div>
                </div>
            ))}
    </>
  )
}
