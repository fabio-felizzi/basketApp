import React, { Component } from 'react';
import { connect } from 'react-redux'

import { ProductList } from '../components';
import Basket from '../components/Basket';

import * as basketActions from '../actions/basket';

export class BasketPage extends Component {

    constructor(props) {
        super(props);
        props.loadBasket();

        this.state = {
            items: [],
        };
    }

    addToBasket = product => {
        const { updateBasket, basket: { id } } = this.props;

        this.setState(prevState => ({
            items: prevState.items.concat(product),
        }), () => {
            console.log('ADD TO BASKET ITEMS IN STATE', this.state.items);
            updateBasket(this.state.items, id);
        });
    }

    increaseQuantity = itemId => {
        const { incQuantity, basket: { id } } = this.props;
        const { items } = this.state;
        const updatedItems = items.map(item => {
            if (item.id === itemId && item.quantity === undefined) {
                item.quantity = 1;
                return item;
            } else {
                item.quantity = item.quantity + 1;
                return item;
            }
        });

        console.log(updatedItems);
        

        incQuantity(id, itemId);
        this.setState({ items: updatedItems });
    }

    decreaseQuantity = itemId => {
        const { decQuantity, basket: { id } } = this.props;
        const { items } = this.state;
        let updatedItems = [];
        if (items.length > 0) {
            updatedItems = items.map(item => {
                if (item.id === itemId && item.quantity === 1) {
                    const removeIndex = items.map(item => item.id).indexOf(itemId);
                    items.splice(removeIndex, 1);
                } else {
                    item.quantity = item.quantity - 1;
                    return item;
                }
            });
        }

        console.log(updatedItems);
        
        decQuantity(id, itemId);
        this.setState({ items: updatedItems });
    }

    deleteItem = itemId => {

    }

    emptyBasket = () => {
        const { clearBasket, basket: { id } } = this.props;

        this.setState({
            items: [],
        },
        () => {
            clearBasket(id);
        });
    }

    render() {
        const { isLoading, products } = this.props;
        const { items } = this.state;

        if (isLoading) {
            return <div> Loading your basket </div>;
        }

        return (
            <div className="container">
                <header className="mt-5 mb-5">
                    <h1>Shopping Basket</h1>
                </header>
                <main className="row">
                    <section className="col">
                        <ProductList
                            products={products}
                            addToBasket={this.addToBasket}
                        />
                    </section>
                    <section className="col">
                        <Basket
                            items={items}
                            increaseQuantity={this.increaseQuantity}
                            decreaseQuantity={this.decreaseQuantity}
                            emptyBasket={this.emptyBasket}
                            deleteItem={this.deleteItem}
                        />
                    </section>
                </main>
            </div>
        )
    }

}

export function mapStateToProps({ basket, products }) {
    return {
        isLoading: !basket.id,
        products,
        basket,
    }
}

export default connect(mapStateToProps, basketActions)(BasketPage);
