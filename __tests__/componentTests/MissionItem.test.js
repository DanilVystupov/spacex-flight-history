import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MissionItem from '../../src/components/MissionItem/MissionItem'; // Путь к компоненту MissionItem

const mockStore = configureStore([]);

describe('MissionItem', () => {
    const mission = {
        id: 1,
        flight_number: 123,
        name: 'Тестовая миссия',
        date_local: '2016-07-21',
        details: 'Это тестовая миссия.',
        links: {
            patch: {
                small: 'mission_patch.jpg',
            },
        },
    };

    it('должен корректно рендерить MissionItem', () => {
        const store = mockStore({
            mission: {
                expandedMissionIds: [],
            },
        });
        render(
            <Provider store={store}>
                <MissionItem mission={mission} />
            </Provider>
        );


    });

    it('должен показывать сокращенные детали и кнопку "Читать далее", когда детали превышают 100 символов', () => {
        const longDetailsMission = {
            ...mission,
            details: 'Это тестовая миссия с длинными деталями.'.repeat(5),
        };

        const store = mockStore({
            mission: {
                expandedMissionIds: [],
            },
        });

        render(
            <Provider store={store}>
                <MissionItem mission={longDetailsMission} />
            </Provider>
        );


        expect(screen.getByText('Читать далее')).toBeInTheDocument();
    });

    it('должен показывать полные детали и кнопку "Скрыть" после клика на "Читать далее"', () => {
        const store = mockStore({
            mission: {
                expandedMissionIds: [],
            },
        });

        render(
            <Provider store={store}>
                <MissionItem mission={mission} />
            </Provider>
        );

    });
});

