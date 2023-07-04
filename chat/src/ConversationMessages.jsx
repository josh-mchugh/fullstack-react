import { connect } from 'react-redux';
import { addMessage, deleteMessage } from './Actions';
import MessagesContainer from './MessagesContainer';

const mapStateToConvoProps = (state) => ({
    conversation: state.conversations.find(convo => convo.id === state.activeConvoId)
});

const mapDispatchToConvoProps = (dispatch) => ({
    onMessageClick: (id) => ( dispatch(deleteMessage(id))),
    dispatch: dispatch
});

const mergeConvoProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    onMessageSubmit: (text) => (
        dispatchProps.dispatch(addMessage(text, stateProps.conversation.id))
    )
});

export default connect(
    mapStateToConvoProps,
    mapDispatchToConvoProps,
    mergeConvoProps
)(MessagesContainer);
