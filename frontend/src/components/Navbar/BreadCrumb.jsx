import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";

export default function BreadCrumb() {
    const router = useRouter();
    const getPathArray = () => {
        const path = router.pathname;
        const pathArray = path.split("/");
        const pathArrayCapitalized = pathArray.map((text) => (text.charAt(0).toUpperCase() + text.slice(1)));
        return pathArrayCapitalized.slice(1);
    }

    const pathArray = getPathArray();
    const pathArrayLength = pathArray.length;
    const pathArrayCapitalized = pathArray.map((text) => (text.charAt(0).toUpperCase() + text.slice(1)));
    return (
        <div className="flex items-center my-3 mt-0 text-xl">
            <div className="flex items-center">
                <div className="text-gray-500 ">
                    <AiFillHome />
                </div>
                <div className="text-gray-500 mx-2">
                    &gt;
                </div>
            </div>
            {pathArrayCapitalized.map((text, index) => {
                if (index === pathArrayLength - 1) {
                    return (
                        <div key={"div-" + index} className="flex items-center">
                            <div className="text-blue-700 px-2 py-1 bg-blue-50 font-semibold rounded-md">{text}</div>
                        </div>
                    )
                }
                return (
                    <div key={"div-" + index} className="flex items-center">
                        <div className="text-gray-500 ">{text}</div>
                        <div className="text-gray-500 mx-2">&gt;</div>
                    </div>
                )
            })}
        </div>
    )
}