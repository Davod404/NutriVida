import Icon from "../atoms/Icon";

export default function Metric({ icon, label, value, detail }) {
    return (
        <div className="metric">
            <span className="p-2 rounded-lg bg-[#e9f5ee] text-[#3f8a69]">
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