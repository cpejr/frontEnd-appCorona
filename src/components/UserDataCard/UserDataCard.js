import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Save } from '@material-ui/icons';
import InputEditable from "./InputEditable";
import "./styles.css";

import { LoginContext } from '../../contexts/LoginContext';
import api from "../../services/api";

export default function UserDataCard({
    mainTitle,
    description,
    genVector, //Needs to be a vector that cointains pairs of names and keys of user data.
    data,
    previousData,
    setData,
}) {

    const { token, signIn, logOut } = useContext(LoginContext);
    const [update, setUpdate] = useState(false);

    useEffect(()=>{
    },[update])

    async function handleSaveData() {

        let body = {};

        function addToData(key, value) {
            if (value !== undefined && value !== '') {
                body[key] = value;
            }
        }

        genVector.forEach(item => {
            addToData(item.objKey, data[item.objKey]);
        })

        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        }

        const response = await api.put(`/ong/${data._id}`, body, config);

        const { accessToken, user } = response.data;

        if (accessToken !== undefined && user !== undefined) {
            logOut();
            signIn(accessToken, user);
            setData({...user});
            setUpdate(!update);
        }
    }

    return (
        <div className="cardInfo">

            <div className="userProfile">
                <div className="titleRow">
                    <h2>{mainTitle}</h2>
                    <div className="saveButton">
                        <Save className="save" onClick={(e) => handleSaveData()} />
                    </div>
                </div>
                <p>{description}</p>
            </div>

            <div className="infoEditable">
                <form>
                    {
                        genVector.map((dataElement) => {
                            return (
                                <InputEditable
                                    title={dataElement.title}
                                    data={data}
                                    previousData={previousData}
                                    setData={setData}
                                    objKey={dataElement.objKey}
                                    key={dataElement.objKey}
                                />
                            )
                        })
                    }
                </form>
            </div>
        </div>
    )
}