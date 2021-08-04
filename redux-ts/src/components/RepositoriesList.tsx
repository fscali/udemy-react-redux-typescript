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
            {error && <h3>{error}</h3>}
            {loading && <h3>Loading...</h3>}
            {!error &&
                !loading &&
                data.map((name) => <div key={name}>{name}</div>)}
        </div>
    )
}

export default RepositoriesList
