import "./navbar.scss";

export default function Navbar() {
  return (
    <div className={"navbar"}>
      <div className={"wrapper -large -padded"}>
        <div className={"flex -justify-space-between -align-center content"}>
          <a href="/" className={"home"}>ShopiDrone</a>
          <div className={"flex -justify-space-between -align-center content"}>
            <a href="/fullList" className={"nav-item"}>Acheter</a>
            <a href="/sell" className={"nav-item"}>Vends tes pièces</a>
          </div>
          <a href="/public" className={"btn"}>Se connecter</a>
        </div>
      </div>
    </div>
  );
}