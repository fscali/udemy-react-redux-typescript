import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { actionCreators } from '../state'

const RepositoriesList: React.FC = () => {
    const dispatch = useDispatch()
    const [term, setTerm] = useState('')
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(actionCreators.searchRepositories(term))
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={term} onChange={(e) => setTerm(e.target.value)} />
                <button>Search</button>
            </form>
        </div>
    )
}

export default RepositoriesList
