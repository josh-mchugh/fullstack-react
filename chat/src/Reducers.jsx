import { combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';

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

const defaultJackSparrowMessages = [
    {
        text: 'Why is the rum always gone?',
        timestamp: Date.now(),
        id: uuidv4()
    }
];

const defaultWillTurnerMessages = [
    {
        text: 'This is either madness... or brilliance',
        timestamp: Date.now(),
        id: uuidv4()
    }
];

const defaultConversationsState = [
    {
        id: '1-fac2',
        title: 'Jack Sparrow',
        messages: messagesReducer(defaultJackSparrowMessages, {})
    },
    {
        id: '2-b91e',
        title: 'Will Turner',
        messages: messagesReducer(defaultWillTurnerMessages, {})
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
                messages: messagesReducer(oldConvo.messages, action)
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

function messagesReducer(state = [], action) {
    switch(action.type) {
        case 'ADD_MESSAGE': {
            const message = {
                text: action.text,
                timestamp: Date.now(),
                id: uuidv4()
            };
            return state.concat(message);
        }
        case 'DELETE_MESSAGE': {
            return state.filter(m => m.id !== action.id);
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
