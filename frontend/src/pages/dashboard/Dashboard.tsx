import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Header from "../../components/common/header/Header"

import { Info, PlusSquare } from 'react-bootstrap-icons';

import UserService from '../../services/UserService';
import keycloak from '../../keycloak';
import PollService from '../../services/PollService';
import { Poll } from '../../models/Poll';
import InfoCards from '../../components/shared/infoCards/InfoCards';

import OutlookService from '../../services/OutlookService';

const Dashboard: React.FC = () => {
    const [myPolls, setMyPolls] = useState<Poll[]>([]);
    const [runningPolls, setRunningPolls] = useState<Poll[]>([]);

    const pollService = new PollService(keycloak);



    const outlookService = new OutlookService(keycloak);
    useEffect(() => {
        outlookService.getAuthLink();
    }, []);



    const navigate = useNavigate();

    useEffect(() => {

        getMyPolls();
    }, []);

    async function getMyPolls() {
        // get all polls, till specific api requests are implemented
        const allPolls = await pollService.getAllPolls();

        setMyPolls(allPolls);
    }

    const handleCreateClick = () => {
        navigate('/polls');
    };

    return (
        <div className="app-body">
            <div className='tab my-poll-tab'>

                <h1 className="created-polls-tab-header">
                    Meine Umfragen
                    <div className='header-button-group'>
                        <div className="create-button" onClick={handleCreateClick}>
                            <PlusSquare className="plus-icon" />
                            <span className="text">Erstellen</span>
                        </div>
                    </div>
                </h1>

                < InfoCards useCase={'myPolls'} pollData={myPolls} onPollDelete={getMyPolls} />
            </div>

            <div className='tab event-tab'>
                <h1 className="created-polls-tab-header">
                    Events
                </h1>
                < InfoCards useCase={'runningPolls'} pollData={myPolls} />
            </div>

        </div>
    );
};

export default Dashboard;