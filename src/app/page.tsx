import Image from "next/image";
import "../app/assets/styles/main.scss"
import ProductList from "./components/ProductList/ProductList"

export default function Home() {
    return (
        <div className="home">
            <ProductList />
        </div>
    )
}