import { useContext } from "react"
import { ThemeContext } from "../../App";
import { observer } from "mobx-react";
import './Recipes.scss';

function Recipes({ store }) {

    const { recipes } = store;
    const themeContextObject = useContext(ThemeContext)

    return (
        <div className={`recipe-section ${themeContextObject.theme}`} >
            <section className="d-flex flex-row gap-4 flex-wrap justify-content-start container mt-4" >
                {
                    recipes && recipes.map((each, index) => {
                        return (
                            <div className="card recipe-card border" key={index}>
                                <img src={each?.recipe?.image} className="card-img-top p-1" alt={each?.recipe?.label} height={250} />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title"><b>{each?.recipe?.label}</b></h5>
                                    <div className="content">
                                        <div>
                                            <span>{Math.trunc(each?.recipe?.calories)} calories</span> | <span>{each?.recipe?.ingredients.length} Ingredients</span>
                                        </div>
                                        <a href={each?.recipe?.url} className="source hyper-link">{each?.recipe?.source}</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default observer(Recipes)