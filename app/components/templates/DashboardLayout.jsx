import Sidebar from "../organisms/Sidebar";

export default function DashboardLayout({
    children,
    role = "Paciente"
}) {
    return (
        <div className="dashboard">
            <Sidebar role={role} />

            <main className="dash-main">
                {children}
            </main>
        </div>
    );
}