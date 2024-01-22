import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';

function PostIdPage() {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const respons = await PostService.getById(id);
        setPost(respons.data);
    });

    const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
        const respons = await PostService.getCommentsByPostId(id);
        setComments(respons.data);
    })

    useEffect(()=> {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, []);

    return (
        <div>
           <h1>Post id {params.id}</h1>
           {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>Comment</h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm => 
                        <div key={comm.id} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default PostIdPage;