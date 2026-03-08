import React from "react";
import ProductItem from "./ProductItem";

function CategorySection({ title, items, onIncrease, onDecrease }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 text-blue-600 border-b-2 border-blue-100 pb-2">
        {title === "general" ? "สินค้าทั่วไป" : title}
      </h3>

      <div className="space-y-3">
        {items.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
