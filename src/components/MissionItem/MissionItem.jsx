import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectExpandedMissionIds,
    setMissionExpanded,
    setMissionCollapsed,
} from '../../store/missionsSlice';
import './missionItem.scss';

const MissionItem = ({ mission }) => {
    const dispatch = useDispatch();
    const expandedMissionIds = useSelector(selectExpandedMissionIds);
    const isExpanded = expandedMissionIds.includes(mission.id);

    const handleReadDetails = () => {
        if (isExpanded) {
            dispatch(setMissionCollapsed(mission.id));
        } else {
            dispatch(setMissionExpanded(mission.id));
        }
    };

    return (
        <div className='mission-item'>
            <p className='mission-item__flight-number'>
                Полёт &#8470;{mission.flight_number}: {mission.name}
            </p>
            <p className="mission-item__date">Дата: {mission.date_local}</p>
            {mission.details && (
                <div>
                    {isExpanded ? (
                        <p className="mission-item__details">
                            Информация о полёте: {mission.details}
                        </p>
                    ) : (
                        <p className="mission-item__details">
                            Информация о полёте: {mission.details.slice(0, 100)}...
                        </p>
                    )}
                    {mission.details.length > 100 && (
                        <button
                            className="mission-item__read-more"
                            onClick={handleReadDetails}
                        >
                            {isExpanded ? 'Скрыть' : 'Читать далее'}
                        </button>
                    )}
                </div>
            )}
            <div className='mission-item__image'>
                <img src={mission.links.patch.small} alt="Mission Patch" />
            </div>
        </div>
    );
};

export default MissionItem;

