import Icon from "./Icon";

export default function Logo({ onClick }) {
    const content = (
        <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f6b4f] text-white">
                <Icon name="leaf" size={22} />
            </div>

            <span className="text-xl font-bold text-[#1f6b4f]">
                Nutri<span className="text-[#3f8a69]">Vida</span>
            </span>
        </div>
    );

    if (!onClick) {
        return content;
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer bg-transparent border-none p-0"
            aria-label="Ir al inicio"
        >
            {content}
        </button>
    );
}