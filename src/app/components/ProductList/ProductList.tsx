"use client";
import { useState, useRef, useEffect } from "react";
import Card from "../Card/Card";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
  catégorie: string;
}

export  const products: Product[] = [
    { id: 1, name: 'Product 1', catégorie: 'hélice', price: 10, description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt labore facere voluptatem. Blanditiis repudiandae adipisci porro illum aliquam, quis dolor eveniet laborum odit esse quia facere iusto perspiciatis. Pariatur, dignissimos.', img: `data:image/jpeg;base64,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`  },
    { id: 2, name: 'Product 2', catégorie: 'batterie', price: 20, description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt labore facere voluptatem. Blanditiis repudiandae adipisci porro illum aliquam, quis dolor eveniet laborum odit esse quia facere iusto perspiciatis. Pariatur, dignissimos.', img: `data:image/jpeg;base64,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` },
    { id: 3, name: 'Product 3', catégorie: 'chassis', price: 30, description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt labore facere voluptatem. Blanditiis repudiandae adipisci porro illum aliquam, quis dolor eveniet laborum odit esse quia facere iusto perspiciatis. Pariatur, dignissimos.', img: `data:image/jpeg;base64,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`  },
    { id: 4, name: 'Product 4', catégorie: 'caméra', price: 40, description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt labore facere voluptatem. Blanditiis repudiandae adipisci porro illum aliquam, quis dolor eveniet laborum odit esse quia facere iusto perspiciatis. Pariatur, dignissimos.', img: `data:image/jpeg;base64,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` },
    { id: 5, name: 'Product 5', catégorie: 'hélice', price: 50, description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt labore facere voluptatem. Blanditiis repudiandae adipisci porro illum aliquam, quis dolor eveniet laborum odit esse quia facere iusto perspiciatis. Pariatur, dignissimos.',img : `data:image/jpeg;base64,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` },
]

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const categoryFilterRef = useRef<HTMLDivElement | null>(null);
  const priceFilterRef = useRef<HTMLDivElement | null>(null);

  const maxPriceInProducts = Math.max(...products.map((product) => product.price));
  const allCategories = Array.from(new Set(products.map((product) => product.catégorie)));

  const filteredProducts = products
    .filter(
      (product) =>
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (minPrice === "" || product.price >= minPrice) &&
        (maxPrice === "" || product.price <= maxPrice) &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.catégorie))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const handleApplyFilter = () => {
    setShowPriceFilter(false);
  };

  const handleCategoryFilterToggle = () => {
    setShowCategoryFilter((prev) => !prev);
  };

  const handlePriceFilterToggle = () => {
    setShowPriceFilter((prev) => !prev);
  };

  // Close category filter on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        categoryFilterRef.current &&
        !categoryFilterRef.current.contains(event.target as Node)
      ) {
        setShowCategoryFilter(false);
      }

      if (
        priceFilterRef.current &&
        !priceFilterRef.current.contains(event.target as Node)
      ) {
        setShowPriceFilter(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div style={{ color: "black", padding: "16px", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "16px 0",
          gap: "16px",
        }}
      >
        <input
          type="text"
          placeholder="Rechercher un produit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid black",
            width: "250px",
            color: "black",
            backgroundColor: "white",
          }}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid black",
            width: "150px",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <option value="">Trier par prix</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
        <div style={{ position: "relative" }}>
          <button
            onClick={handleCategoryFilterToggle}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid black",
              backgroundColor: "white",
              color: "black",
              cursor: "pointer",
            }}
          >
            Catégories
          </button>
          {showCategoryFilter && (
            <div
              ref={categoryFilterRef}
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                zIndex: 10,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid black",
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "200px",
              }}
            >
              {allCategories.map((category) => (
                <label
                  key={category}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px 8px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "black" }}>{category}</span>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    style={{
                      cursor: "pointer",
                      appearance: "checkbox",
                    }}
                  />
                </label>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <button
            onClick={handlePriceFilterToggle}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid black",
              backgroundColor: "white",
              color: "black",
              cursor: "pointer",
            }}
          >
            Filtrer par prix
          </button>
          {showPriceFilter && (
            <div
              ref={priceFilterRef}
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                zIndex: 10,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid black",
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "200px",
              }}
            >
              <input
                type="number"
                value={minPrice}
                min="0"
                onChange={(e) => setMinPrice(Number(e.target.value) || "")}
                placeholder="Prix min"
                style={{
                  padding: "6px",
                  borderRadius: "4px",
                  border: "1px solid black",
                  width: "100%",
                  color: "black",
                  backgroundColor: "white",
                  marginBottom: "8px",
                }}
              />
              <input
                type="number"
                value={maxPrice}
                min="0"
                max={maxPriceInProducts}
                onChange={(e) => setMaxPrice(Number(e.target.value) || "")}
                placeholder="Prix max"
                style={{
                  padding: "6px",
                  borderRadius: "4px",
                  border: "1px solid black",
                  width: "100%",
                  color: "black",
                  backgroundColor: "white",
                  marginBottom: "8px",
                }}
              />
              <button
                onClick={handleApplyFilter}
                style={{
                  padding: "6px 8px",
                  borderRadius: "4px",
                  border: "1px solid black",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  lineHeight: "20px",
                  height: "auto",
                  cursor: "pointer",
                }}
              >
                Appliquer
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          color: "black",
        }}
      >
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            img={product.img}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
