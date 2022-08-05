import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate} from "react-router-dom"
import { ContactService } from "../services/ContactService";
import Spinner from "./Spinner";

export default function EditContact(){
    let navigate = useNavigate();
    let {contactId} = useParams();

    let [state, setState] = useState({
        loading : false,
        contact : {
            name : '',
            photo : '',
            mobile : '',
            email : '',
            company : '',
            title : '',
            groupId : ''
        },
        groups : [],
        errorMessage : ''
    });

    async function fetchData() {
        try {
        setState({...state, loading : true});
      // You can await here
      const response = await ContactService.getContact(contactId);
      const groupResponse = await ContactService.getGroups();
      // ...
      setState({
        ...state,
        loading: false,
        contact : response.data,
        groups : groupResponse.data
      });
    }catch(error){
        setState({
            ...state,
            loading:false,
            errorMessage:error.message
        });
    }
    }

    useEffect(() => {
        
        fetchData();
      }, [contactId]);

      let updateInput = (event) => {
        setState({
            ...state, 
            contact : {
                ...state.contact,
                [event.target.name] : event.target.value
            }
        });
      };

      async function submitForm(event) {
        event.preventDefault();
        try {
            let response = await ContactService.updateContact(state.contact, contactId);
            if (response) {
                navigate('/contacts/list', {replace:true});
            }
        } catch (error) {
            setState({...state, errorMessage: error.message});
            navigate(`/contacts/edit/${contactId}`, {replace:false});
        }
      };

      let {loading, contact, groups, errorMessage} = state;

    return (
        <div>
            {
                loading ? <Spinner /> :<div>
                     <section className="edit-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold">Edit Contact</p>
                            <p className="fst-italic">lorem30   </p>

                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input 
                                    required="true"
                                    name="name"
                                    onChange={updateInput}
                                    value={contact.name} type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="mb-2">
                                    <input 
                                     required="true"
                                     name="photo"
                                     onChange={updateInput}
                                     value={contact.photo}
                                    type="text" className="form-control" placeholder="Photo Url" />
                                </div>
                                <div className="mb-2">
                                    <input
                                     required="true"
                                     name="mobile"
                                     onChange={updateInput}
                                     value={contact.mobile}
                                    type="number" className="form-control" placeholder="Mobile" />
                                </div>
                                <div className="mb-2">
                                    <input
                                     required="true"
                                     name="email"
                                     onChange={updateInput}
                                     value={contact.email}
                                    type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="mb-2">
                                    <input
                                     required="true"
                                     name="company"
                                     onChange={updateInput}
                                     value={contact.company}
                                    type="text" className="form-control" placeholder="Company" />
                                </div>
                                <div className="mb-2">
                                    <input 
                                     required="true"
                                     name="title"
                                     onChange={updateInput}
                                     value={contact.title}
                                    type="text" className="form-control" placeholder="Title" />
                                </div>
                                <div className="mb-2">
                                    <select 
                                     required="true"
                                     name="groupId"
                                     onChange={updateInput}
                                     value={contact.groupId}
                                    className="form-control">
                                        <option value="">Select a Group</option>   
                                        {
                                            groups.length > 0 &&
                                            groups.map(group =>{
                                                return(
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                )
                                            })
                                        } 
                                     </select>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-primary" value="Update" />
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                                </div> 
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img src={contact.photo} alt="" className="contact-img"/>
                        </div>
                    </div>
                </div>
            </section>
                </div>
            }
            <pre>{JSON.stringify(contactId)}</pre>
            <pre>{JSON.stringify(contact)}</pre>
           
       </div>)
}