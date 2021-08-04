import { FormEvent, useState } from 'react'
import { useActions } from '../hooks/useActions'

const RepositoriesList: React.FC = () => {
    const { searchRepositories } = useActions()

    const [term, setTerm] = useState('')
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        searchRepositories(term)
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
