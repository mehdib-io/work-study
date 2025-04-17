import { FaRegComment, FaHeart, FaRegBookmark } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import PostActionButton from "./PostActionButton";

type Props = {
  commentCount: number;
  repostCount: number;
  likeCount: number;
  bookmarkCount: number;
  onCommentClick: () => void;
  onRepostClick: () => void;
  onLikeClick: () => void;
  onBookmarkClick: () => void;
};

const PostActions = ({
  commentCount,
  repostCount,
  likeCount,
  bookmarkCount,
  onCommentClick,
  onRepostClick,
  onLikeClick,
  onBookmarkClick,
}: Props) => {
  return (
    <section className="post-actions">
      <PostActionButton icon={<FaRegComment />} count={commentCount} onClick={onCommentClick} />
      <PostActionButton icon={<FaRetweet />} count={repostCount} onClick={onRepostClick} />
      <PostActionButton icon={<FaHeart />} count={likeCount} onClick={onLikeClick} />
      <PostActionButton icon={<FaRegBookmark />} count={bookmarkCount} onClick={onBookmarkClick} />
    </section>
  );
};

export default PostActions;
