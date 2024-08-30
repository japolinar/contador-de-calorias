type CaloriesDisplayProps = {
    calories: number,
    text: string
}

export const CaloriesDisplay = ({calories, text}: CaloriesDisplayProps) => {
  return (
    <p className=" text-white font-bold text-center rounded-full grid grid-cols-1 gap-3">
        <span className={`font-bold text-6xl ${text === 'Consumidas' ? ' text-green-700' : text === 'Diferencia' ? ' text-red-300' : 'text-orange-700'} `} >
            {calories}    
        </span> 
        {text}
    </p>
  )
}
