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
        const { payload } = action;

        // see https://immerjs.github.io/immer/update-patterns for deleting from objects (1) and arrays (2)
        delete state.data[payload];

        /*  const index = state.order.findIndex((o) => o === payload);
        if (index !== -1) state.order.splice(index, 1); */
        //or
        state.order = state.order.filter((id) => id !== action.payload);
        return;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return;
      case ActionType.INSERT_CELL_BEFORE:
        return state;
      default:
        return state;
    }
  }
);

export default cellsReducer;
