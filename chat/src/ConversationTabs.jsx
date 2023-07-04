import Tabs from './Tabs';
import { connect } from 'react-redux';
import { openConvo } from './Actions';

const mapStateToTabsProps = (state) => {
    const tabs = state.conversations.map(convo => ({
        title: convo.title,
        active: convo.id === state.activeConvoId,
        id: convo.id
    }));

    return {
        tabs
    };
};

const mapDispatchToTabsProps = (dispatch) => ({
    onClick: (id) => (
        dispatch(openConvo(id))
    )
});

export default connect(
    mapStateToTabsProps,
    mapDispatchToTabsProps
)(Tabs);
