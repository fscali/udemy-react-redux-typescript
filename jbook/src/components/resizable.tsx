import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox resizeHandles={['s']} height={300} width={300}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
