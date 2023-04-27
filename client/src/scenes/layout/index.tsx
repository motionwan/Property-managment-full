import TopBar from '../global/top-bar/top-bar';
import MainSidebar from '../global/sidebar/sidebar';

export interface LayoutProps {
    children?: JSX.Element | Array<JSX.Element | string> | string;
}
const MainLayout = ({ children }: LayoutProps) => {
    return (
        <div>
            <main>
                <MainSidebar>{children}</MainSidebar>
            </main>
        </div>
    );
};

export default MainLayout;
