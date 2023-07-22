import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions, selectMissions, selectSortByYear } from '../../store/missionsSlice';
import useMissionListSorted from '../../hooks/useMissionListSorted';
import MissionItem from '../MissionItem/MissionItem';
import './missionList.scss';
import Loader from './../../UI/Loader/Loader';

const MissionList = () => {
    const dispatch = useDispatch();
    const missions = useSelector(selectMissions);
    const sortByYear = useSelector(selectSortByYear);
    const { filteredMissions, handleSortChange } = useMissionListSorted(missions, sortByYear);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMissionsData = async () => {
            try {
                await dispatch(fetchMissions());
                setLoading(false);
            } catch (error) {
                console.error('Произошла ошибка при загрузке:', error.message);
                setLoading(false);
            }
        };

        fetchMissionsData();
    }, [dispatch]);


    return (
        <div className="mission-list">

            <h1 className="mission-list__title">
                Список успешных полётов SpaceX с 2015 по 2019 годов:
            </h1>

            <button className="mission-list__sort-button" onClick={handleSortChange}>
                Сортировать {sortByYear === 'asc' ? 'по убыванию' : 'по возрастанию'} годов
            </button>

            {loading ? (
                <Loader />
            ) : (
                <div className='mission-item-wrap'>
                    {filteredMissions.map((mission) => (
                        <MissionItem
                            key={mission.id}
                            mission={mission}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MissionList;