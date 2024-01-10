import { useContext, useEffect, useState } from "react"
import { RECIPE_SEARCH_URL } from "../../constants"
import { ThemeContext } from "../../App";
import './Recipes.scss';

export function Recipes() {
    const themeContextObject = useContext(ThemeContext)
    const [searchQuery, setSearchQuery] = useState('bread');
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(`${RECIPE_SEARCH_URL}${searchQuery}`).then(res => res.json()).then(res => {
            if (res?.hits)
                setRecipes(res?.hits)
            else
                setRecipes([])
        })
    }, [searchQuery])

    const handleChange = (event) => {
        setSearchQuery(event.target.value)
    }

    return (
        <div className={`mt-5 ${themeContextObject.theme}`} >
            <input className="form-control search me-4"  type="search" placeholder="Search" aria-label="Search" onChange={handleChange}></input>
            <section className="d-flex flex-row gap-5 flex-wrap justify-content-center mt-4" >
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