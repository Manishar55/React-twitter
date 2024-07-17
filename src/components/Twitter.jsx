import TweetList from './TweetList.jsx';
import AddTweet from './AddTweet.jsx';
import { useState, useCallback, memo } from 'react';

const initialDummyTweets=[
  { id: 0, content: 'we have a new twitter called as thread', likeCount: 7, createdAt: new Date()},
  { id: 1, content: 'what should we post ??', likeCount: 6, createdAt: new Date()},
  { id: 2, content: 'what is up with tech community ?', likeCount: 4, createdAt: new Date()}
];

const MemoisedAddTweet = memo(AddTweet);


function Twitter() {
    const [tweets, setTweets]=useState(initialDummyTweets);

    const handleAddTweet=useCallback((text)=>{
        let nextId=(tweets.length > 0)? tweets[tweets.length-1].id+1:0;
        setTweets([...tweets, {
            content: text, 
            likeCount: Math.floor(Math.random()*10),
            id: nextId,
            createdAt: new Date()
        }])
    }, [tweets]);

    //useCallback hook-> it remembers which callback is changing or not changing
    //this useCallback function takes an callback as an argument and takes another argument i.e an array 
    //this array is going be an array of dependencies, inside that array of dependencies you can put some variables
    //it that particular variable change due to any triggered then that callback will be rerenderd 
    //if any dependencies that you have mentioned is not going to change then this callback will be taken from cashed/memoised callback

    //so first time when you render it then it will cash it and everytime it uses the same cash/memo until or unless any of the 
    //dependencies you mentioned here changes

    
    const handleEditTweet=useCallback((tweet)=>{ //this incoming tweet is the updated tweet
      setTweets(
        tweets.map((currentTweet)=>{
          if(currentTweet.id===tweet.id){
            return tweet;
          }
          else{
            return currentTweet;
          }
        })
      )
    }, [tweets])

    const sortTweets = useCallback(()=>{
      tweets.sort((t1, t2)=>t2.createdAt.getTime() - t1.createdAt.getTime());
      setTweets([...tweets]);
    }, [tweets])

  return (
    <>
        <MemoisedAddTweet onAddTweet={handleAddTweet}/>
        <button onClick={sortTweets}>Sort tweet by createdAt at</button>
        <TweetList tweets={tweets} onEditTweet={handleEditTweet}/>
    </> 
    
  );
}
export default Twitter;