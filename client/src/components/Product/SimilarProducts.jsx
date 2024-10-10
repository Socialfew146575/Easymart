import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/productActions';
import Product from '../Home/Product';

const SimilarProducts = ({ products, id }) => {
    // Filter products to exclude the one with the matching id
    const filteredProducts = products.filter(product => product._id !== id);

    return (
        <div
            id="container"
            className='flex my-[2vmax] flex-wrap gap-4 items-center'
        >
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <Product product={product} key={product._id} />
                ))
            ) : (
                <p>No similar products found.</p>
            )}
        </div>
    );
}

export default SimilarProducts;
