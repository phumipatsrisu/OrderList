import React from "react";

function ProductItem({ product, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center bg-gray-50 p-3 rounded-xl shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="w-14 h-14 mr-3 object-cover rounded-lg bg-white border border-gray-200"
      />

      <div className="flex-1">
        <h4 className="text-base font-medium text-gray-800 leading-tight">
          {product.name}
        </h4>
        <p className="text-xs text-gray-500 mt-1">หน่วย: {product.unit}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(product.id)}
          className="w-8 h-8 flex items-center justify-center text-lg bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition-colors font-bold"
        >
          -
        </button>

        <span className="text-base font-bold w-6 text-center text-gray-800">
          {product.qty}
        </span>

        <button
          onClick={() => onIncrease(product.id)}
          className="w-8 h-8 flex items-center justify-center text-lg bg-green-100 text-green-600 hover:bg-green-200 rounded-full transition-colors font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
