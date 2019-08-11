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
        // const { items } = this.state;
        // const matchedItemsInState = items.filter(item => item.id === itemID);
        // console.log(matchedItemsInState);
        // console.log(this.props.basket.items);
        
        // const matchedItemsInBasket = Object.entries(this.props.basket.items[matchedItemsInState[0].id]).filter(item => item.itemId === itemID);
        // console.log(matchedItemsInBasket);
        
        // const newTotal = matchedItemsInState[0].amount = matchedItemsInBasket[0].amount;

        incQuantity(id, itemId);
        this.setState({ items });
    }

    decreaseQuantity = itemId => {
        const { decQuantity, basket: { id } } = this.props;
        const { items } = this.state;
        const matchedItems = items.filter(item => item.id === itemId);

        // this.setState(() => {
        //     const decAmount = matchedItems[0].amount = matchedItems.length;
            
        //     return decAmount;
        // }, () => {
        //     decQuantity(id, itemId);
        // });
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
