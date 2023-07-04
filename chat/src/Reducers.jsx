import { combineReducers } from 'redux';

function findConvoIndex(convos, action) {
    switch(action.type) {
        case 'ADD_MESSAGE': {
            return convos.findIndex(t => t.id ==action.convoId);
        }
        case 'DELETE_MESSAGE': {
            return convos.findIndex(t => t.messages.find(m => m.id === action.id));
        }
    };
};

const defaultConversationsState = [
    {
        id: '1-fac2',
        title: 'Jack Sparrow',
        messages: []
    },
    {
        id: '2-b91e',
        title: 'Will Turner',
        messages: []
    }
];

function conversationsReducer(state=defaultConversationsState, action) {
    switch(action.type) {
       case 'ADD_MESSAGE':
       case 'DELETE_MESSAGE': {
          const convoIndex = findConvoIndex(state, action);
          const oldConvo = state[convoIndex];
          const newConvo = {
              ...oldConvo,
              messages: []
          };

          return [
              ...state.slice(0, convoIndex),
              newConvo,
              ...state.slice(convoIndex + 1, state.length)
          ];
       }
       default:
          return state;
    }
};

function activeConvoIdReducer(state = '1-fac2', action) {
    return action.type === 'OPEN_CONVO' ? action.id : state;
}

export const reducer = combineReducers({
    activeConvoId: activeConvoIdReducer,
    conversations: conversationsReducer
});
