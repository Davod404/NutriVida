export default function PageTitle({
    title,
    subtitle,
    action
}) {
    return (
        <div className="dash-title">
            <div>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>

            {action}
        </div>
    );
}