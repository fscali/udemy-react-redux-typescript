import { FormEvent, useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
const RepositoriesList: React.FC = () => {
    const { searchRepositories } = useActions()
    const { data, error, loading } = useTypedSelector(
        (state) => state.repositories
    )

    const [term, setTerm] = useState('')
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        searchRepositories(term)
    }
    console.log(data)
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
