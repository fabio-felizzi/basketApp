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
        this.setState(prevState => ({
            items: prevState.items.concat(product),
        }), () => {
             this.props.updateBasket(this.state.items);
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
                        <ProductList products={products} addToBasket={this.addToBasket} />
                    </section>
                    <section className="col">
                        <Basket items={items} />
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
