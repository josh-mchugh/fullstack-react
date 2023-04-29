class ProductList extends React.Component {
    render() {
        return (
            <div className='ui stackable items'>
                Hello, friend! I am a basic React component.
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(<ProductList />);
