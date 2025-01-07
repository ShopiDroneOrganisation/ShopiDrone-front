import Image from "next/image";
import ProductList from "./components/ProductList/ProductList"

export default function Home() {
    return (
        <div className="home">
            <ProductList />
        </div>
    )
}