import React, {memo} from 'react'
import defaultImage from '../image/default-avatar-profile-icon-male.jpg'
import style from './Gallery.module.css'


const Gallery=memo(({data,time})=>{
    return(
        <div className={style.Gallery}>
            {data&&data.map(item=>(
                <div className={style.Items}>
                    {item.data.thumbnail!='self' ? <img src={item.data.thumbnail}/>
                     :<img src={defaultImage}/>}
                        <p>Title: {item.data.id}</p>
                    <p>Data: {time}</p>
                        <p>Number of comments: {item.data.num_comments}</p>
                        <p><a href={`${'https://www.reddit.com'}${item.data.permalink}`}>Go to the reddit</a></p>


                </div>

                )

            )}
        </div>
    )
})
export  default  Gallery;