import "../styles.css";


export default function Nav({ unitMeasure, unitMeasureHandler }) {

    return (
        <div>
            <nav>
                <h1>
                    <i className="fab fa-react"></i> WEATHER APP
                </h1>

                <div className="units">
                    <button className={unitMeasure === "imperial" ? "unit-active-highlight" : null} onClick={() => unitMeasureHandler("imperial")}>IMPERIAL</button>
                    <h2> | </h2>
                    <button className={unitMeasure === "metric" ? "unit-active-highlight" : null} onClick={() => unitMeasureHandler("metric")}>METRIC</button>
                </div>
            </nav>
        </div>
    );
}
