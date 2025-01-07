import './dashboard.scss'
import ProductList from "@/app/components/ProductList/ProductList";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="wrapper -large -padded">
                <h1>Vous avez 3 articles en vente</h1>
                <ProductList />
            </div>
        </div>
    )
}