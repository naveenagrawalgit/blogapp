import React, { useEffect } from 'react'
import appwriteService from "../appwrite/configuration"
import {Container, PostCard} from "../components"

function AllPost() {

    const [posts,setPosts] = useState([])
    useEffect(() => {}, [])
appwriteService.getPosts([]).then((posts) => {
    if(posts){
        setPosts(posts.documents)
    }
})


return (
<div className='w-full py-8'>
    
    <Container>
        <div className='flex flex-wrap'>
        {posts.map((post) => (<div key={post.$id}> 
            <PostCard post = {post}/>

        </div>))}


        </div>
    </Container>
    
    </div>)



  return (
    <div>AllPost</div>
  )
}

export default AllPost