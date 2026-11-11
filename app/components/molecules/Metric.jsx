import Icon from "../atoms/Icon";

export default function Metric({ icon, label, value, detail }) {
    return (
        <div className="metric">
            <span className="metric-icon">
                <Icon name={icon} />
            </span>

            <div>
                <small>{label}</small>
                <b>{value}</b>
                {detail && <p>{detail}</p>}
            </div>
        </div>
    );
}