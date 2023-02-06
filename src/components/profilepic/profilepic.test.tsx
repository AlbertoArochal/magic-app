import { ProfilePic } from './profilepic';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { userContext } from '../../contexts/user/usercontext';
describe('ProfilePic', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ProfilePic />);
        expect(baseElement).toBeTruthy();
    });
    jest.mock('../../contexts/user/usercontext', () => {
        return {
            userContext: {
                user: {
                    photoURL: 'fake-photo-url.jpg',
                },
            },
        };
    });

    describe('ProfilePic', () => {
        afterEach(cleanup);
        it('should not render the picture if theres no user', () => {
            const TestComponent = () => {
                return <ProfilePic />;
            };
            const Wrapper = ({ children }) => (
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

            expect(screen.getByText('nopic')).toBeInTheDocument();
        });
        it('should render the picture if theres no user', () => {
            const TestComponent = () => {
                return <ProfilePic />;
            };
            const Wrapper = ({ children }: any) => (
                <userContext.Provider
                    value={{
                        user: {
                            photoURL: 'fake-photo-url.jpg',
                        },
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

            expect(screen.getByAltText('Profile pic')).toBeInTheDocument();
        });
    });
});
