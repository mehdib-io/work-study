import { ReactNode } from "react";

type Props = {
    icon: ReactNode;
    count: number;
    onClick?: () => void;
};

const PostActionButton = ({ icon, count, onClick }: Props) => {
    return (
        <button className="button" onClick={onClick}>
            <span className="icon">{icon}</span>
            {count !== undefined && <span className="count">{count}</span>}
        </button>
    );
};

export default PostActionButton;
