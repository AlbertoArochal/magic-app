import { useContext } from 'react';
import { userContext } from '../../../contexts/usercontext';
import { LogDelete } from './logdelete';
import { screen, render, fireEvent } from '@testing-library/react';

describe('LogDelete', () => {
    jest.mock('../../../contexts/usercontext' as any, () => ({
        userContext: {
            user: {
                uid: '1234567890',
            },
        },
    }));

    const useContext = jest.fn();
    useContext.mockReturnValue({
        user: {
            uid: '1234567890',
        },
    });

    it('should be defined', () => {
        expect(LogDelete).toBeDefined();
    });
    it('should be a function', () => {
        expect(typeof LogDelete).toBe('function');
    });
});
