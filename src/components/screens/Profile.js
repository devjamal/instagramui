import React,{useEffect , useState , useContext}  from 'react';
import { UserContext } from '../../App'


const Profile=()=>
{
    const [mypics,setPics] = useState([])
    const { state , dispatch} = useContext(UserContext)

    useEffect(()=>{
    
    fetch('/mypost',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setPics(result.mypost)
    })
 },[])
 

    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent :"space-around",
                margin:"18px 0px",
             borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}} src="https://images.unsplash.com/photo-1569124589354-615739ae007b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/>
                </div>
                <div >
                    <h4>{ state ?state.name : "loading name"}</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"109%"}}>
           <h5>40 posts</h5>
            <h5>20 followers</h5>
            <h5>80 following</h5>
           </div>
              
                </div>
        

            </div>
         <div className="gallery">
         {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }
         </div>
        </div>
    )
}

export default Profile