import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import moment from 'moment'

const PlayVideo = () => {

  const {videoId} = useParams()

const [apiData,setApiData] = useState(null)

const [channelData,setChennalData] = useState(null)
const [commentData,setCommentData] = useState([])
const fetchVideoData=async()=>{
  //fetch video data
  const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
  await fetch(videoDetails_url)
  .then(res=>res.json())
  .then(data=>setApiData(data.items[0]))
}

const fetchOtherData =async()=>{
  //fetch chennal data
  const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
  await fetch(channelData_url)
  .then(res=>res.json())
  .then(data=>setChennalData(data.items[0]))

  //fetch comment data
  const comment_url = ` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY} `
  await fetch(comment_url)
  .then(res=>res.json())
  .then(data=>setCommentData(data.items))
}

useEffect(()=>{
  fetchOtherData();
},[apiData])

useEffect(()=>{
fetchVideoData();
},[videoId])




  return (
    <div className='play-video' >
      {/*<video src={video1} controls autoPlay  muted> </video>*/}
      <iframe src={`https://www.youtube.com/embed/${videoId}  `} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData?apiData.snippet.title:"title haer"}e</h3>
      <div className='play-video-info'>
        <p>{apiData?valueConverter(apiData.statistics.viewCount):"16k"} views &bull; {moment(apiData?apiData.snippet.publishedAt:"no date").fromNow()} </p>
        <div>
            <span > <img src={like} alt=' '/>{apiData?valueConverter(apiData.statistics.likeCount):"0"}</span>
            <span > <img src={dislike} alt=' '/>{apiData?valueConverter(apiData.statistics.dislikeCount):"0"}</span>
            <span > <img src={share} alt=' '/>Share</span>
            <span > <img src={save} alt=' '/>Save</span>
        </div>
      </div>
      <hr/>
      <div className='publisher' >
        <img src={channelData?channelData.snippet.thumbnails.default.url:"{jack}"} ></img>
        <div>
            <p>{apiData?apiData.snippet.channelTitle:""}</p>
            <span>{channelData?valueConverter(channelData.statistics.subscriberCount):"10"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className='vid-description'>
        <p>{apiData?apiData.snippet.description.slice(0,250):"description"}</p>
        
        <hr/>
         <h4>{apiData?valueConverter(apiData.statistics.commentCount):"comments"} Comments</h4>

         {commentData.map((item,index)=>{
          return(

            <div key={index} className='comment' >
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} ></img>
            <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                <p> {item.snippet.topLevelComment.snippet.textDisplay} </p>
                    <div className='comment-action' >
                        <img src={like} alt='' ></img>
                        <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                        <img src={dislike} alt='' ></img>
                        <span>2</span>
                    </div>
            </div>
         </div>
          )
         })}


      </div>
    </div>
  )
}
import './PlayVideo.css'
import { API_KEY ,valueConverter} from '../../data'
import { useParams } from 'react-router-dom'

export default PlayVideo
