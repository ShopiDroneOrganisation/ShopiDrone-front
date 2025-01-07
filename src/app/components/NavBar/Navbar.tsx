import "./navbar.scss"

export default function Navbar() {
    return (
        <div className={'navbar'}>
            <div className={'wrapper -large -padded'}>
                <div className={'flex -justify-space-between -align-center content'}>
                    <a href="/public" className={'home'}>ShopiDrone</a>
                    <a href="/public" className={'nav-item'}>Vends tes pièces</a>
                    <a href="/public" className={'btn'}>Se connecter</a>
                </div>
            </div>
        </div>
    )
}