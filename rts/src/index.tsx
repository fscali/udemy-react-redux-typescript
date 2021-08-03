import ReactDOM from 'react-dom'
import GuestList from './state/GuestList'
import UserSearch from './state/UserSearch'
import EventComponent from './events/EventComponent'
import UserSearchWithRefs from './refs/UserSearch'
const App = () => {
    return (
        <div>
            {/*             <GuestList />
             */}{' '}
            {/*  <UserSearch />{' '} */}
            {/*             <EventComponent />
             */}
            <UserSearchWithRefs />{' '}
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
