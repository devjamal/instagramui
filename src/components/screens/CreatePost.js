import React, {useState , useEffect} from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';




const CreatePost = () => {
    const history = useHistory()
    const [title , settitle] = useState("")
    const [body , setbody] = useState("")
    const [image , setImage] = useState("")
    const [url , setUrl] = useState("")
    useEffect(()=>{
        if(url){
        fetch("/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
    
            },
    
            body: JSON.stringify({
                title,
                body,
                pic :url
    
            })
    
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
    
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else{
                    M.toast({ html: "post created successfully", classes: "#69f0ae green accent-2" })
                    history.push('/')
                }
            }).catch(
                error=>{console.log(error)
                }
                
                
            )
        }
    
    }, [url])
    
    


const Postdetails = () => {
    const data = new FormData()
    data.append("file" ,image)
    data.append("upload_preset","instaclone")
    data.append("cloud_name","instacopy")
    fetch("https://api.cloudinary.com/v1_1/instacopy/image/upload", {
        method: "Post",
        body: data

    })
    .then(res => res.json())
        .then(data => {setUrl(data.url)
        
        }).catch(
            error=>{console.log(error)
            })

      
    }

    return (
        <div className="card input-field" style={{margin:"30px auto" , maxWidth:"500px", padding:"20px", textAlign:'center'}} >
            <input
             type="text" 
             placeholder="title" 
             value={title}
             onChange={(e)=>settitle(e.target.value)}
             />
            <input type="text" 
            placeholder="Body of Post"
            value={body}
            onChange={(e)=>setbody(e.target.value)} />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-2">
                    <span>UPLOAD IMAGE</span>
                    <input type="file"
                    onChange={(e)=>setImage(e.target.files[0])}
                    />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                     </div>
                    </div>
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={()=>Postdetails() } >Submit  Post</button>

                </div>
                
    )
}

export default CreatePost