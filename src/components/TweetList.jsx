import Tweet from "./Tweet.jsx";
import '../CSS/TweetList.css';
import { memo } from "react";

//useMemo-> if the parent components re-render child component will not re-render if the props are change 
const MemoisedTweet=memo(Tweet);

function TweetList({ tweets, onEditTweet }){
    return(
        <ul className="tweet-list">
            {
                tweets.map((tweet)=>(
                    <li className="tweet-like-wrapper" key={tweet.id}>
                        {/* <Tweet  => use MemoisedTweet instead*/}
                        <MemoisedTweet 
                        tweetId={tweet.id}
                        content={tweet.content} 
                        likeCount={tweet.likeCount} 
                        createdAt={tweet.createdAt.toString()}
                        onEdit={onEditTweet}
                        />
                    </li>
                ))
            }
        </ul>
    )
}

export default TweetList;