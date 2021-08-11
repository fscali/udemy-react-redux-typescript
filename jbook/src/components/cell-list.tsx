import { useStore } from 'react-redux';
import { useTypedSelector } from '../hooks/use-typed-selector';
const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => state.cells);
  console.log('Cells', cells);
  return <div>Cell List</div>;
};
export default CellList;
