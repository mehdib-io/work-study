import NavigationButton from "../components/NavigationButton";
import { FiHome, FiSearch, FiMessageSquare, FiBell } from "react-icons/fi";
import { FaFeatherAlt } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import twitterLogo from "../assets/icons/twitter.png";
import { useState } from "react";
import PostActions from "../components/PostActions";
import RepostModal from "../components/RepostModal";
import { useNavigate } from "react-router-dom";

<img src={twitterLogo} alt="twitter-logo" />;

const Home = () => {
    const navigate = useNavigate();
    const [showRepostModal, setShowRepostModal] = useState(false);
    const handleCommentClick = () => {
        navigate("/post/123");
    };

    const handleRepostClick = () => {
        setShowRepostModal(true);
    };

    const handleLikeClick = () => {
        console.log("Like le post");
    };

    const handleBookmarkClick = () => {
        console.log("Ajouté aux favoris");
    };

    return (
        <>
            <aside className="menu"></aside>
            <header className="home__header">
                <img src="../../public/pp/1.jpg" alt="" className="pp" />
                <img src={twitterLogo} alt="twitter-logo" className="logo" />
                <div></div>
            </header>
            <main className="home__main">
                <article className="post">
                    <aside className="pp">
                        <img src="../../public/pp/1.jpg" alt="" />
                    </aside>
                    <main className="content">
                        <section className="header">
                            <div className="identity">
                                <span className="name">Jules Dupont</span>
                                <span className="handle">
                                    @julesthedevlebgggggggggggggggggggggeste,brazfz
                                </span>
                            </div>
                            <span className="time">· 5 m</span>
                            <button className="more">⋯</button>
                        </section>
                        <section className="text">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam voluptatibus, quos,
                                voluptatum, quisquam voluptatibus, quos
                                voluptatum quisquam voluptatibus, quos
                                voluptatum quisquam voluptatibus, quos
                                voluptatum.
                            </p>
                        </section>
                        <PostActions
                            commentCount={12}
                            repostCount={8}
                            likeCount={64}
                            bookmarkCount={4}
                            onCommentClick={handleCommentClick}
                            onRepostClick={handleRepostClick}
                            onLikeClick={handleLikeClick}
                            onBookmarkClick={handleBookmarkClick}
                        />
                    </main>
                </article>
                <RepostModal
                    isOpen={showRepostModal}
                    onClose={() => setShowRepostModal(false)}
                    onQuote={() => {
                        setShowRepostModal(false);
                        navigate("/post/123/quote"); // à adapter avec l'ID
                    }}
                    onRepost={() => {
                        console.log("Repost effectué");
                        setShowRepostModal(false);
                    }}
                />
            </main>
            <nav className="nav">
                <div>
                    <NavigationButton icon={<FiHome />} to="/" />
                    <NavigationButton icon={<FiSearch />} to="/search" />
                </div>
                <div>
                    <NavigationButton icon={<FaFeatherAlt />} to="/post" />
                </div>
                <div>
                    <NavigationButton icon={<FiBell />} to="/notification" />
                    <NavigationButton icon={<MdOutlineHomeWork />} to="/job" />
                </div>
            </nav>
        </>
    );
};

export default Home;
