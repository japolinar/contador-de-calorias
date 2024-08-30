import { Dispatch, useState, useEffect } from "react";
import {v4 as uuidV4} from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types";
import { ActiivityActions, ActivitySatate } from "../reducers/activity-reducer";

type FormPros = {
    dispatch: Dispatch<ActiivityActions>,
    state: ActivitySatate
}

const initialState : Activity = {
    id: uuidV4(),
    category: 1,
    name: '',
    calory: 0
}
export const Form = ({dispatch, state}: FormPros) => {

    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter((stateActivity)=> stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)            
        }
        
    }, [state.activeId]);

    const handleCahnge = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) =>{     
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        }) 
    }

    const isValidActivity = ()=>{
        const {name, calory} = activity

        return name.trim() !== '' && calory > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        //console.log('Guardando',e.target)
        dispatch({
            type: 'save-activity',
            payload: {
                newActivity: activity
            }
        })

        setActivity({
            ...initialState,
            id: uuidV4()
        })
    }
    
  return (
    <form className=" space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit} >
        <div className=" grid grid-cols-1 gap-3">
            <label className=" font-bold uppercase" htmlFor="category">Categorias: </label>        
            <select 
                className=" border border-slate-300 p-2 rounded-lg w-full bg-white"                
                name="" 
                id="category"
                value={activity.category}
                onChange={handleCahnge}
                >
                {categories.map((item)=>(
                    <option key={item.id} value={item.id}>{item.name}</option>   
                ))}
            </select>  
        </div> 

        <div className=" grid grid-cols-1 gap-3">
            <label className=" font-bold uppercase" htmlFor="name">Actividad: </label>
            <input 
                className=" border border-slate-300 p-2 rounded-lg w-full bg-white" 
                type="text" 
                id="name" 
                value={activity.name}
                onChange={handleCahnge}
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicios, Pesas, Bicicletas"
            />
        </div>

        <div className=" grid grid-cols-1 gap-3">
            <label className=" font-bold uppercase" htmlFor="calory">Calorias: </label>
            <input 
                className=" border border-slate-300 p-2 rounded-lg w-full bg-white" 
                type="number" 
                id="calory" 
                value={activity.calory}
                onChange={handleCahnge}
                placeholder="Calorias: Ej. 300 o 500"
            />
        </div> 

        <input 
            type="submit" 
            value={activity.category === 1 ? 'Guardar Camida' : 'Guardar Ejercicios' }
            className=" bg-indigo-900 text-white w-full p-2 rounded-lg hover:bg-slate-600 cursor-pointer uppercase font-bold disabled:opacity-10"             
            disabled={!isValidActivity()}
        />        
    </form>
  )
}
