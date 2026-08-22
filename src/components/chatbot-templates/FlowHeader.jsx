import React, { useState } from "react";

import CreateFlowModal from "./CreateFlowModal";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";


const FlowHeader = ({onFlowCreated}) => {
    const[open,setOpen]=useState(false);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "30px",
            }}
        >
            <SearchBar />

            <Button
                variant="primary"
                size="md"
                style={{
                    borderRadius: "30px",
                    padding: "8px 22px",  
                    whiteSpace: "nowrap", 
                }}
                onClick={()=>{setOpen(true)}}
            >
                Create Flow
            </Button>
            {open && <CreateFlowModal onClose={()=>{setOpen(false)}} onSuccess={onFlowCreated}/>}
        </div>
    );
};

export default FlowHeader;
