import React from 'react';

const UUIDGenerator = () => {
    const uuid = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return `${uuid()}${uuid()}-${uuid()}-${uuid()}${uuid()}-${uuid()}`;
}

const Basket = ({ items }) => (
    <div className="mr-4">
        <h2>Basket</h2>
        <ul className="list-group">
            {
                items.map(item =>{
                    return (
                        <li className="list-group-item d-flex justify-content-between" key={UUIDGenerator()}>
                            <span>{item.name}</span>
                        </li>
                    )
                }) 
            }
        </ul>
    </div>
);

export default Basket;
