import produce from 'immer';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Cell } from '../Cell';

interface CellsState {
  data: { [key: string]: Cell };
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: CellsState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};

const cellsReducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return;
      case ActionType.DELETE_CELL:
        return state;
      case ActionType.MOVE_CELL:
        return state;
      case ActionType.INSERT_CELL_BEFORE:
        return state;
      default:
        return state;
    }
  }
);

export default cellsReducer;
