import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    icon: ReactNode;
    to: string;
};

const NavigationButton = ({ icon, to }: Props) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(to)} className="nav-button">
            {icon}
        </button>
    );
};

export default NavigationButton;
