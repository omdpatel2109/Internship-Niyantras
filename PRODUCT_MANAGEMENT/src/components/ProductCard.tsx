import type {Product} from '../type/Product';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition duration-200 hover:-translate-y-2 ">
      <div className="h-56 w-full bg-gray-400 ">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-4"
        />
      </div>

      <div className="p-5">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            {product.name}
          </h2>


        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {product.description}
        </p>

        <p className="mb-2 text-xl font-bold text-black-600">
          ₹ {product.cost}
        </p>

        <p className="text-md text-black-600">
          Quantity: {product.quantity}
        </p>
        
      </div>
    </div>
  );
}