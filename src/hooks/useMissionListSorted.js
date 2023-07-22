import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortByYear } from '../store/missionsSlice';

const useMissionListSorted = (missions, sortByYear) => {
    const [filteredMissions, setFilteredMissions] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const filteredMissions = missions.filter(
            (mission) =>
                mission.success &&
                mission.date_local >= '2015-01-01T00:00:00.000Z' &&
                mission.date_local <= '2019-12-31T23:59:59.999Z'
        );

        filteredMissions.sort((a, b) => {
            const dateA = new Date(a.date_local);
            const dateB = new Date(b.date_local);
            return sortByYear === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setFilteredMissions(filteredMissions);

    }, [missions, sortByYear]);

    const handleSortChange = () => {
        dispatch(setSortByYear(sortByYear === 'asc' ? 'desc' : 'asc'));
    };

    return {
        filteredMissions,
        handleSortChange,
    };
};

export default useMissionListSorted;