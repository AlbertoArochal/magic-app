import { ProfileButton } from './profilebutton';
import { render, screen, fireEvent } from '@testing-library/react';
import { userContext } from '../../contexts/usercontext';
import { signInWithPopup } from 'firebase/auth';

jest.mock('firebase/auth');
jest.mock('firebase/database');

describe('ProfileButton', () => {
    it('should not call signInWithGoogle', () => {
        const mockSignInWithGoogle = jest.fn();
        jest.mock('../services/signwithgoogle', () => ({
            signInWithGoogle: mockSignInWithGoogle,
        }));
        const TestComponent = () => {
            return <ProfileButton />;
        };
        const mockUser = {
            uid: '123',
            displayName: 'Alberto',
            decks: {},
            name: 'Alberto',
            profilePic: 'https://picsum.photos/200',
        };
        (signInWithPopup as jest.Mock).mockResolvedValue({
            user: mockUser,
        });
        const Wrapper = ({ children }: any) => (
            <userContext.Provider
                value={{
                    user: null,
                    logout: jest.fn(),
                    setUser: jest.fn(),
                }}
            >
                {children}
            </userContext.Provider>
        );

        render(
            <Wrapper>
                <div>
                    <TestComponent />
                </div>
            </Wrapper>
        );
        const button = screen.getByText('PROFILE');
        fireEvent.click(button);

        expect(mockSignInWithGoogle).not.toHaveBeenCalled();
    });
    it('should not call sigInWithGoogle', () => {
        const mockSignInWithGoogle = jest.fn();
        jest.mock('../services/signwithgoogle', () => ({
            signInWithGoogle: mockSignInWithGoogle,
        }));
        const TestComponent = () => {
            return <ProfileButton />;
        };
        const mockUser = {
            uid: '123',
            displayName: 'Alberto',
            decks: {},
            name: 'Alberto',
            profilePic: 'https://picsum.photos/200',
        };
        (signInWithPopup as jest.Mock).mockResolvedValue({
            user: mockUser,
        });
        const Wrapper = ({ children }: any) => (
            <userContext.Provider
                value={{
                    user: mockUser,
                    logout: jest.fn(),
                    setUser: jest.fn(),
                }}
            >
                {children}
            </userContext.Provider>
        );

        render(
            <Wrapper>
                <div>
                    <TestComponent />
                </div>
            </Wrapper>
        );
        const button = screen.getByText('PROFILE');
        fireEvent.click(button);

        expect(mockSignInWithGoogle).not.toHaveBeenCalled();
    });
});
