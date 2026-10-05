import "./globals.css";

export const metadata = {
    title: "NutriVida",
    description: "Clínica Nutricional NutriVida",
};

export default function RootLayout({ children }) {
    return (
        <html
            data-scroll-behavior="smooth"
            lang="es"
            className={`h-full antialiased`}
            
        >
            
            <body>{children}</body>
        </html>
    );
}
