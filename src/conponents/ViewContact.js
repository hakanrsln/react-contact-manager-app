import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../services/ContactService";
import Spinner from "./Spinner";

export default function ViewContact(){

    let {contactId} = useParams();

  <h2>{contactId}</h2>

        let [state, setState]= useState({
            loading : false,  
            contact : {},
            errorMessage:"",
            group : {}
        });
    
       async function viewHandler(){
            try {
                setState({...state, loading:true});
                let response = await ContactService.getContact(contactId);
                let groupResponse = await ContactService.getGroup(response.data);
                setState({...state, loading:false, contact: response.data, group : groupResponse.data});
            } catch (error) {
                setState({...state, loading:false, errorMessage:error.message});
            }
        }
    
        useEffect(() => { 
        viewHandler();
              
        }, [contactId]);


    let {loading, contact, group, errorMessage} = state;

    return (
        
        <div>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                         <div className="col">
                            <p className="h4 text-warning fw-bold">View Contact</p> 
                            <h2>{contactId}</h2>
                            <p className="fst-italic">lorem</p>
                         </div>
                    </div>
                </div>
                
            </section>

            

            {
                loading ? <Spinner /> : <div>
                    <section className="view-contact mt-3">
                <div className="container">
                    <div className="row align-items-center">
                         <div className="col-md-4">
                            <img src={contact.photo} alt="" className="contact-img" />
                         </div>
                         <div className="col-md-8">
                                <ul className="list-group">
                                     <li className="list-group-item list-group-item-action">
                                                 Name : <span className="fw-bold">{contact.name}</span>
                                     </li>
                                     <li className="list-group-item list-group-item-action">
                                                Mobile : <span className="fw-bold">{contact.mobile}</span>
                                     </li>
                                    <li className="list-group-item list-group-item-action">
                                                 Email : <span className="fw-bold">{contact.email}</span>
                                     </li>
                                     <li className="list-group-item list-group-item-action">
                                                 Company : <span className="fw-bold">{contact.company}</span>
                                     </li>
                                     <li className="list-group-item list-group-item-action">
                                                 Title : <span className="fw-bold">{contact.title}</span>
                                     </li>
                                     <li className="list-group-item list-group-item-action">
                                                 Group : <span className="fw-bold">{group.name}</span>
                                     </li>
                                </ul>
                         </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Link to={'/contacts/list'} className="btn btn-warning">Back</Link>
                        </div>
                    </div>
                </div>
                
            </section>
                </div>
            }
            
       </div>)
}