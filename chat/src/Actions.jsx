export const openConvo = (id) => {
    return {
        type: 'OPEN_CONVO',
        id: id
    };
};

export const addMessage = (text, convoId) => {
    return {
        type: 'ADD_MESSAGE',
        text: text,
        convoId: convoId
    };
};

export const deleteMessage = (id) => {
    return {
        type: 'DELETE_MESSAGE',
        id: id
    };
};
