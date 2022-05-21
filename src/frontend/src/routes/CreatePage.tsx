import React from "react";
import CreateForm from "../components/CreateForm";

import "./styles/Create.scss";

const CreatePage = () =>
{
    return (
        <div className="main-page">
            <h1>Hirdetés létrehozása</h1>
            <CreateForm oldpost={null} edit={false} />
        </div>
    );
}

export default CreatePage;