import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import useMissionListSorted from '../../src/hooks/useMissionListSorted';
import { setSortByYear, selectMissions, selectSortByYear } from '../../src/store/missionsSlice';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

test('useMissionListSorted returns filtered missions and handleSortChange', () => {
    const missions = [
        { id: 1, success: true, date_local: '2017-07-20T12:00:00.000Z' },
        { id: 2, success: true, date_local: '2016-07-20T12:00:00.000Z' },
    ];
    const sortByYear = 'desc';
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation((selector) => selector({ missions: missions, sortByYear }));

    const { result } = renderHook(() => useMissionListSorted(missions, sortByYear));

    expect(result.current.filteredMissions).toEqual([
        { id: 1, success: true, date_local: '2017-07-20T12:00:00.000Z' },
        { id: 2, success: true, date_local: '2016-07-20T12:00:00.000Z' },
    ]);

    act(() => {
        result.current.handleSortChange();
    });

    expect(dispatch).toHaveBeenCalledWith(setSortByYear('asc'));
});

