import { Activity } from "../types"
import Swal from "sweetalert2"

export type ActiivityActions = 
{ type: 'save-activity', payload: {newActivity: Activity}} |
{ type: 'set-activeId', payload: {id: Activity['id']}} |
{ type: 'delete-activity', payload: {id: Activity['id']}} |
{ type: 'restart-app'}

export type ActivitySatate = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStarageActivities = () :Activity[] =>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivitySatate = {
    activities: localStarageActivities(),
    activeId: ''
}

export const activityReducer = (
        state: ActivitySatate = initialState,
        action: ActiivityActions
    )=>{

    if (action.type === 'save-activity' ) {
        //Este codigo maneja la logica para actualizar el state  
        let updatedActivities : Activity[] = []

        if (state.activeId) {
            updatedActivities = state.activities.map((item) => item.id === state.activeId ? action.payload.newActivity : item)

        }else{
            updatedActivities = [
                ...state.activities,
                action.payload.newActivity
            ]
        }
        return{
            ...state,
            activities: updatedActivities,
            activeId: ''
        }        
    }

    if (action.type === 'set-activeId') {
        return{
            ...state,
           activeId: action.payload.id
        }
    }

    if (action.type === 'delete-activity') {   
        
        return{
            ...state,
            activities: state.activities.filter((item) => item.id !== action.payload.id)                    
        }  
                 
    }

    if (action.type === 'restart-app') {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "App Reiniciada",
            showConfirmButton: false,
            timer: 1500
        })

        return{
            activities: [],
            activeId: ''
        }        
    }

    return state
}