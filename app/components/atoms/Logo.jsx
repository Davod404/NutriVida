import Icon from "./Icon";

export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-white bg-[#1f6b4f]">
                <Icon name="leaf" size={22}/>
            </div>

            <span className="text-xl font-bold text-green-dark">
                Nutri<span className="text-[#3f8a69]">Vida</span>
            </span>
        </div>
    );
}