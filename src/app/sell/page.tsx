import './sell.scss'

export default function Sell() {
    return (
        <div className="page-sell">
            <div className="wrapper -medium -padded">
                <h1>Vends ton article</h1>
                <div className="bloc">
                    <div className="img-area flex -align-center -justify-center">
                        <input type="file" accept="image/png, image/jpeg, image/jpg"/>
                    </div>
                </div>

                <div className="bloc">
                    <div className="grid -two">
                        <div className="col -one label -auto">Titre</div>
                        <div className="col -one -auto">
                            <input type="text" className="input-text" placeholder={'ex: Hélice '}/>
                        </div>
                    </div>
                    <hr className="separator"/>
                    <div className="grid -two">
                        <div className="col label -one -auto">Décris ton article</div>
                        <div className="col -one -auto">
                            <textarea name="description" id="description" className="text-area"
                                      placeholder={'ex: état neuf'}></textarea>
                        </div>
                    </div>
                </div>
                <div className="bloc">
                    <div className="grid -two">
                        <div className="col -one -auto label flex -align-center">Catégorie</div>
                        <div className="col -one -auto">
                            <select name="category" id="category" className="select btn -outline">
                                <option value="none">Sélectionne une catégorie</option>
                                <option value="cat-1">Catégorie 1</option>
                                <option value="cat-2">Catégorie 2</option>
                                <option value="cat-3">Catégorie 3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bloc">
                    <div className="grid -two">
                        <div className="col -one label -auto">Prix</div>
                        <div className="col -one -auto">
                            <input type="number" className="input-text" placeholder={'0,00€ '}/>
                        </div>
                    </div>
                </div>
                <button className="btn add-btn">Ajouter</button>
            </div>
        </div>
    )
}