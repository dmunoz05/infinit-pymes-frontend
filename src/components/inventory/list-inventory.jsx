/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import bebidas from "@assets/images/bebida.webp";
import { v4 as crypto } from "uuid";

export default function ListInventory() {
  const categoriesList = [
    "Seleccione...",
    "Bebidas",
    "Cervezas",
    "Licores",
    "Misceláneos",
    "Gaseosas",
    "Cócteles",
  ];

  const list = [
    {
      id: crypto(),
      name: "Cerveza",
      category: "Bebidas",
      price: "5000",
      stock: 10,
    },
    {
      id: crypto(),
      name: "Licor",
      category: "Licores",
      price: "5000",
      stock: 12,
    },
    {
      id: crypto(),
      name: "Gaseosa",
      category: "Gaseosas",
      price: "5000",
      stock: 15,
    },
  ];

  const [idProduct, setIdProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [categoryProduct, setCategoryProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [stockProduct, setStockProduct] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [listProduct, setListProduct] = useState(list);

  function clearFields() {
    setNameProduct("");
    setCategoryProduct("");
    setPriceProduct("");
    setStockProduct("");
  }

  const handleAddProduct = () => {
    setListProduct((prev) => [
      ...prev,
      {
        id: crypto.randomUUID,
        name: nameProduct,
        category: categoryProduct,
        price: priceProduct,
        stock: stockProduct,
      },
    ]);
  };

  const handleSaveProduct = () => {
    const product = listProduct.find((product) => product.id === idProduct);
    product.name = nameProduct;
    product.category = categoryProduct;
    product.price = priceProduct;
    product.stock = stockProduct;
    setListProduct(listProduct);
    setShowAddProduct(false);
    clearFields();
  };

  const handleCategory = (value) => {
    setCategoryProduct(value);
  };

  const handleEditProduct = (id) => {
    const product = listProduct.find((product) => product.id === id);
    setIdProduct(product.id);
    setNameProduct(product.name);
    setCategoryProduct(product.category);
    setPriceProduct(product.price);
    setStockProduct(product.stock);
    setShowAddProduct(true);
  };

  const handleDeleteProduct = (id) => {
    const products = listProduct.filter((product) => product.id !== id);
    setListProduct(products);
  };

  useEffect(() => {
    if (showAddProduct && nameProduct === "") {
      setShowAddProduct(!showAddProduct);
    } else {
      setShowAddProduct(false);
    }
  }, [listProduct]);

  return (
    <div>
      <button
        className="bg-blue-500 rounded-lg p-2 text-white"
        onClick={() => setShowAddProduct(!showAddProduct)}
      >
        Añadir nuevo
      </button>
      {showAddProduct && (
        <div className="flex flex-col pt-5">
          <div className="flex flex-row">
            <div className="w-2/5 grid">
              <div>
                <label className="text-100">
                  Ingresa los datos del producto
                </label>
              </div>
              <div className="pt-0">
                <label className="text-100">Nombre:</label>
                <input
                  className="w-full p-2 rounded-lg outline-none"
                  type="text"
                  value={nameProduct}
                  placeholder="Gaseosa"
                  onChange={(e) => setNameProduct(e.target.value)}
                />
              </div>
              <div className="pt-2">
                <label className="text-100">Categoría:</label>
                <select
                  className="w-full p-2 rounded-lg outline-none cursor-pointer"
                  value={categoryProduct}
                  onChange={(e) => handleCategory(e.target.value)}
                >
                  {categoriesList.map((item, index) => (
                    <option key={index} value={item} className="text-200">
                      {item}
                    </option>
                  ))}
                  {/* {categoryProduct !== '' && ( <option>{categoryProduct}</option> ) } */}
                  {/* <option>Seleccione...</option>
                                        <option>Uno</option>
                                        <option>Dos</option>
                                        <option>Tres</option>
                                        <option>Cuatro</option> */}
                </select>
              </div>
              <div className="pt-2 flex gap-8">
                <div>
                  <label className="text-100">Precio:</label>
                  <input
                    className="w-full p-2 rounded-lg outline-none"
                    type="number"
                    placeholder="$20.000"
                    value={priceProduct}
                    onChange={(e) => setPriceProduct(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-100">Cantidad:</label>
                  <input
                    className="w-full p-2 rounded-lg outline-none"
                    type="number"
                    value={stockProduct}
                    onChange={(e) => setStockProduct(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="h-full w-3/5 p-6">
              <img
                className="w-full h-full max-h-60 object-cover"
                src={bebidas}
                alt=""
              />
            </div>
          </div>
          {idProduct !== "" &&
          nameProduct !== "" &&
          categoryProduct !== "" &&
          priceProduct !== "" &&
          stockProduct !== "" ? (
            <button
              className="bg-blue-500 rounded-lg p-2 text-white mt-4"
              onClick={() => handleSaveProduct()}
            >
              Editar
            </button>
          ) : (
            <button
              className="bg-blue-500 rounded-lg p-2 text-white mt-4"
              onClick={() => handleAddProduct()}
            >
              Añadir
            </button>
          )}
        </div>
      )}
      {!showAddProduct && (
        <div className="w-full h-full pt-5">
          <ul className="[&>li>h1]:font-black flex flex-col gap-4 [&>li]:rounded-lg [&>li]:p-4">
            {listProduct.map((item, index) => (
              <li key={index} className="bg-200">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex gap-2">
                    <h1 className="text-100">Producto:</h1>
                    <span className="text-200">{item.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <h1 className="text-100">Categoría:</h1>
                    <span className="text-200">{item.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <h1 className="text-100">Precio:</h1>
                    <span className="text-200">${item.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <h1 className="text-100">Cantidad:</h1>
                    <span className="text-200">{item.stock}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(item.id)}
                      className="bg-blue-500 rounded-lg p-2 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-pencil"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                        <path d="M13.5 6.5l4 4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="bg-red-500 rounded-lg p-2 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-trash"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
