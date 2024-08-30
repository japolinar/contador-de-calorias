import { useMemo } from "react"
import type { Activity } from "../types"
import { CaloriesDisplay } from "./CaloriesDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export const CalorieTracker = ({activities} : CalorieTrackerProps) => {
    //contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + +activity.calory : total, 0), [activities])
    const caloriesBuened = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + +activity.calory : total, 0), [activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBuened , [activities])

  return (
    <>
        <h2 className=" text-3xl text-white text-center uppercase font-bold">Resumen de Calorias</h2>

        <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CaloriesDisplay
                calories= {caloriesConsumed}
                text= 'Consumidas'
            />
            <CaloriesDisplay
                calories= {caloriesBuened}
                text= 'Ejercicios'
            />    
            <CaloriesDisplay
                calories= {netCalories}
                text= 'Diferencia'
            />    
        </div>
    </>
  )
}
