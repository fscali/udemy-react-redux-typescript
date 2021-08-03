import { ChangeEvent, DragEvent } from 'react'

const EventComponent: React.FC = () => {
    const onChange = (e: ChangeEvent) => console.log(e)
    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
        console.log(e)
    }
    return (
        <div>
            <input onChange={onChange} />
            <div draggable onDragStart={onDragStart}>
                Drag me!
            </div>
        </div>
    )
}

export default EventComponent
