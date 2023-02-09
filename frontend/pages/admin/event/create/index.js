import BreadCrumb from "@components/Navbar/BreadCrumb";
import CreateEvent from "./form";

export default function Event() {
    return (
        <div className="m-10">
            <BreadCrumb />
            <CreateEvent />
        </div>
    )
}