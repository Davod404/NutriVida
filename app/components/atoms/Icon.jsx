export default function Icon({ name, size = 20 }) {
    const paths = {
        leaf: (
            <>
                <path d="M20 4c-7.5-.3-13 3.2-14.4 8.2-1 3.7 1.5 6.3 4.7 5.7C15.2 17 19 11.7 20 4Z" />
                <path d="M4 20c2.4-4.5 6.4-7.7 11.5-9.5" />
            </>
        ),

        calendar: (
            <>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
            </>
        ),

        arrow: (
            <>
                <path d="M5 12h14M14 7l5 5-5 5" />
            </>
        ),

        user: (
            <>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c.6-4.2 3.2-6 8-6s7.4 1.8 8 6" />
            </>
        ),

        clock: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </>
        ),

        check: <path d="m5 12 4 4L19 6" />,

        menu: <path d="M4 7h16M4 12h16M4 17h16" />,

        close: <path d="m6 6 12 12M18 6 6 18" />,

        heart: (
            <path d="M20.8 9.2c0 5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 9.2A4.7 4.7 0 0 1 12 6.8a4.7 4.7 0 0 1 8.8 2.4Z" />
        ),

        chart: (
            <>
                <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
            </>
        ),

        users: (
            <>
                <circle cx="9" cy="8" r="3" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M15 15c3.7-.8 5.7.9 6 4" />
            </>
        ),

        file: (
            <>
                <path d="M6 3h8l4 4v14H6z" />
                <path d="M14 3v5h5M9 13h6M9 17h6" />
            </>
        ),

        settings: (
            <>
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
            </>
        ),

        logout: (
            <>
                <path d="M10 5H4v14h6M14 8l4 4-4 4M18 12H9" />
            </>
        ),

        home: (
            <>
                <path d="m3 11 9-8 9 8" />
                <path d="M5 10v11h14V10M9 21v-6h6v6" />
            </>
        ),

        plus: <path d="M12 5v14M5 12h14" />,

        search: (
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 5 5" />
            </>
        ),

        bell: (
            <>
                <path d="M6 10c0-4 2-6 6-6s6 2 6 6v5l2 2H4l2-2z" />
                <path d="M10 20h4" />
            </>
        ),

        edit: (
            <>
                <path d="m14 5 5 5L9 20H4v-5z" />
                <path d="m12 7 5 5" />
            </>
        ),
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {paths[name]}
        </svg>
    );
}