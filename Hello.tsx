import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export interface ProductDataItems {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

const Hello = (): JSX.Element => {
  const [product, setProduct] = useState<Array<ProductDataItems>>([]);
  const [error, setError] = useState<string>("");
  const [url, setUrl] = useState<string>(
    "https://fakestoreapi.com/products?limit=3"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setProduct(response.data);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, [url]);

  const handleAddToCart = (addItem: ProductDataItems) => {
    let temp = [...product];
    let flag = false;
    for (let item of temp) {
      if (item.id === addItem.id) {
        item.quantity ? (item.quantity += 1) : (item.quantity = 1);
        flag = true;
        break;
      }
    }
    if (!flag) {
      temp.push(addItem);
    }
    setProduct(temp);
    console.log("temp", temp);
  };
  return (
    <div>
      <h2>Items</h2>
      {product.map(item => (
        <li key={item.id} className="p-2">
          {item.title} @ ${item.price}
          <button
            onClick={() => {
              console.log(item);
              handleAddToCart(item);
            }}
          >
            Add
          </button>
        </li>
      ))}

      {product.map(item => {
        return (
          <div>
            disc:{item.title} : quantity: {item.quantity}
          </div>
        );
      })}
    </div>
  );
};

export default Hello;
