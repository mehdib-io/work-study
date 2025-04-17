import { useEffect } from "react";
import { FaRetweet } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onQuote: () => void;
  onRepost: () => void;
};

const RepostModal = ({ isOpen, onClose, onQuote, onRepost }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="repost-modal__overlay" onClick={onClose}>
      <div className="repost-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onRepost}><span><FaRetweet /></span><span>Repost</span></button>
        <button onClick={onQuote}><span><TiPencil /></span><span>Quote</span></button>
      </div>
    </div>
  );
};

export default RepostModal;
