import Icon from "../atoms/Icon";

export default function ServiceCard({
    code,
    type,
    title,
    description,
    duration,
    modality,
    price,
    icon,
    featured = false,
    popular = false,
}) {
    return (
        <article className={`service-card ${featured ? "featured" : ""}`}>
            {popular && <span className="popular">Más popular</span>}

            <div className="service-top">
                <span className="service-icon">
                    <Icon name={icon} />
                </span>

                <span className="code">{code}</span>
            </div>

            <span className="type">{type}</span>

            <h3>{title}</h3>

            <p>{description}</p>

            <div className="service-meta">
                <span>
                    <Icon name="clock" />
                    {duration}
                </span>

                <span>
                    <Icon name="user" />
                    {modality}
                </span>
            </div>

            <div className="service-price">
                <div>
                    <small>Desde</small>
                    <b>{price}</b>
                </div>

                <button>
                    <Icon name="arrow" />
                </button>
            </div>
        </article>
    );
}